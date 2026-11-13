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
}

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

    
const url: string = "http://127.0.0.1:4000/issues";
const method: string = "GET";
const requestHeaders = new Headers();
requestHeaders.set("Content-Type", "application/json");

async function addUsername(data: Issue[] | null, apiCall: ApiCall): Promise<IssueWithUsername[] | null | undefined> {
    if (!data) return;
    const issuesWithUsernames: IssueWithUsername[] = await Promise.all(
        data.map(async (issue) => ({
            ...issue,
            username: await getUsername(issue.user_id, apiCall),
        })),
    );
    return issuesWithUsernames;
}

async function getUsername(id: number | null, apiCall: ApiCall): Promise<string> {
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

async function fetchIssues(ignore: boolean, setError: React.Dispatch<React.SetStateAction<string>>, setData: React.Dispatch<React.SetStateAction<Issue[] | null>>) {
    try {
        const response = await fetchData<IssueResponse>(url);
        if (ignore) return;
        setError("");
        setData(response.allIssues);
    } catch (error: unknown){
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
    if(!data) return;
    return data.toSorted(
        (a,b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
}

export { addUsername, handleDate, organizeData, fetchIssues, type Issue, type IssueWithUsername };
