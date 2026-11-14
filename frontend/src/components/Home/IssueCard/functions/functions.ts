import type { useAPI } from "../../../../hooks/useAPI";

type ApiCall = ReturnType<typeof useAPI>["apiCall"];

type Issue = {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    votes: number;
    user_id: number | null;
    username?: string;
    createdAt: string;
    updatedAt: string;
};

type IssueWithUsername = {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    votes: number;
    user_id: number | null;
    username?: string;
    createdAt: string;
    updatedAt: string;
};

type IssueResponse = {
    message: string;
    allIssues: Issue[];
};

type User = {
    user_name: string;
};

type APIResponse = {
    message: string;
    user: User;
};

type UserResponse = {
    message: string;
    user: {
        user_name: string;
    };
};

type ResType = {
    message: string;
};

type Payload = {
    id: number;
    iat: number;
    exp: number;
};

const url: string = "http://127.0.0.1:4000/issues";
const method: string = "GET";
const requestHeaders = new Headers();
requestHeaders.set("Content-Type", "application/json");

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

async function getUsername(
    id: number | null,
    apiCall: ApiCall,
): Promise<string> {
    if (!id) return "Anonymous";
    try {
        const response: APIResponse = await apiCall<UserResponse>(
            method,
            `user/${id}`,
            requestHeaders,
        );
        return response.user.user_name;
    } catch {
        return "Unknown user";
    }
}

async function fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Request failed: HTTP ${res.status}`);
    }

    return (await res.json()) as T;
}

async function fetchIssues(
    ignore: boolean,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setData: React.Dispatch<React.SetStateAction<Issue[] | null>>,
) {
    try {
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

async function handleDeletePost(
    postId: number | null,
    loading: boolean | null,
    token: string | null,
    setError: React.Dispatch<React.SetStateAction<string>>,
    apiCall: <T>(
        method: string,
        endpoint: string,
        headers: Headers,
        body?: object | undefined,
    ) => Promise<T>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    setRenderPosts: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> {
    if (postId === null || loading) return;

    if (!token) {
        setError("Please sign in before deleting a post.");
        return;
    }

    setError("");

    const requestHeaders = new Headers();
    requestHeaders.set("authorization", token);

    try {
        const res = await apiCall<ResType>(
            "DELETE",
            `issues/${postId}`,
            requestHeaders,
        );
        console.log(postId);
        console.log(res);

        handleClose(setAnchorEl);
        setRenderPosts(prev => !prev);
    } catch (caughtError) {
        setError(
            caughtError instanceof Error
                ? caughtError.message
                : "Could not delete the post.",
        );
    }
}

function handleClose(
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
): void {
    setAnchorEl(null);
}

function handleMenu(
    e: React.MouseEvent<HTMLElement>,
    id: number,
    setPostId: React.Dispatch<React.SetStateAction<number | null>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
) {
    setPostId(id);
    setAnchorEl(e.currentTarget);
}

function handleDate(data: string): string {
    const date: Date = new Date(data);
    const displayDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return displayDate;
}

function organizeData(data: Issue[]): Issue[] | undefined {
    if (!data) return;
    return data.toSorted(
        (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
    );
}

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
    handleDate,
    organizeData,
    fetchIssues,
    handleMenu,
    handleDeletePost,
    handleClose,
    decodeToken,
    type Issue,
    type IssueWithUsername,
};
