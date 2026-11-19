import type {
    ApiCall,
    Issue,
    IssueWithUsername, 
    IssueResponse,  
    APIResponse,
    UserResponse, 
    Payload
} from "../Types/IssuesCardsTypes";

// Set a username for every post
async function addUsername(
    data: Issue[] | null,
    apiCall: ApiCall,
): Promise<IssueWithUsername[] | null | undefined> {
    if (!data) return;
    const issuesWithUsernames: IssueWithUsername[] = await Promise.all(
        data.map(async (issue) => ({
            ...issue,
            username: await getUsername(issue.user_id, apiCall),
        })),
    );
    return issuesWithUsernames;
}

// Get the username from the database with the id
async function getUsername(
    id: number | null,
    apiCall: ApiCall,
): Promise<string> {
    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    if (!id) return "Anonymous";
    try {
        const response: APIResponse = await apiCall<UserResponse>(
            "GET",
            `user/${id}`,
            requestHeaders,
        );
        return response.user.user_name;
    } catch {
        return "Unknown user";
    }
}

// Saves the fetched issues in 'data' state variable
async function fetchIssues(
    token: string | null,
    signal: AbortSignal,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setData: React.Dispatch<React.SetStateAction<Issue[] | null>>,
) {
    try {
        const baseUrl: string = "http://127.0.0.1:4000";
        const { allIssues } = await fetchData<IssueResponse>(
            `${baseUrl}/issues`,
            { signal },
        );
        let likedIssueIds = new Set<number>();
        let voteError = "";

        if (token) {
            try {
                const { issueIds } = await fetchData<{ issueIds: number[] }>(
                    `${baseUrl}/issue-votes/me`,
                    {
                        headers: { Authorization: `Bearer ${token}`},
                        signal,
                    },
                );
                likedIssueIds = new Set(issueIds);
            } catch {
                voteError = "Could not load your saved likes. Sign in again if your session expired.";
            }
        }

        if (signal.aborted) return;

        setData(allIssues.map( issue => ({
            ...issue,
            hasVoted: likedIssueIds.has(issue.id),
        })));
        setError(voteError);
    } catch (error) {
        if (signal.aborted) return;

        setData(null);
        setError(error instanceof Error ? error.message : "Could not load issues.");
    }
}

// Fetches all the issues from the database
async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error(`Request failed: HTTP ${res.status}`);
    }

    return (await res.json()) as T;
}

// Organizes the posts from the newest to the latest
function organizeData(data: Issue[]): Issue[] | undefined {
    if (!data) return;
    return data.toSorted(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
    );
}

// Decodes the JWT token to get the payload info
function decodeToken(
    token: string | null,
    setUserId: React.Dispatch<React.SetStateAction<number>>,
): void {
    if(!token)return;
    const base64URL: string = token.split(".")[1];
    const base64 = base64URL.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(""),
    );
    const objectPayload: Payload = JSON.parse(jsonPayload);
    setUserId(objectPayload.id);
}

export {
    addUsername,
    organizeData,
    fetchIssues,
    decodeToken,
};
