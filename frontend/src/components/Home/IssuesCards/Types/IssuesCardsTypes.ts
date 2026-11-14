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

type Payload = {
    id: number;
    iat: number;
    exp: number;
};


type User = {
    user_name: string;
};

type IssuesCardsProps = {
    renderPosts: boolean;
    setRenderPosts: React.Dispatch<React.SetStateAction<boolean>>;
};

export type {
    ApiCall,
    Issue,
    IssueWithUsername,
    IssuesCardsProps, 
    IssueResponse, 
    User, 
    APIResponse,
    UserResponse, 
    Payload
};