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
    ignore: boolean,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setData: React.Dispatch<React.SetStateAction<Issue[] | null>>,
) {
    try {
        const url: string = "http://127.0.0.1:4000/issues";
        const response = await fetchData<IssueResponse>(url);
        if (ignore) return;
        setError("");
        setData(response.allIssues);
    } catch (error: unknown) {
        if (ignore) return;

        let message: string = "";

        if (error instanceof Error) {
            message = error.message;
        } else {
            message = "An unexpected error occurred";
        }
        setData(null);
        setError(message);
        console.error("Error fetching issues:", message);
    }
}

// Fetches all the issues from the database
async function fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url);

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
