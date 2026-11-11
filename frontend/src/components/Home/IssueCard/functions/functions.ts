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

export { addUsername, getUsername, handleDate, organizeData };
