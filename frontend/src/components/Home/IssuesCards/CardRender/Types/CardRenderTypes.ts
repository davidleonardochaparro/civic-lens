import type { Issue } from "../../Types/IssuesCardsTypes";

type CardRenderProps = {
    issue: Issue;
    userId: number;
    setPostId: React.Dispatch<React.SetStateAction<number | null>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    anchorEl: HTMLElement | null;
    postId: number | null;
    loading: boolean | null;
    token: string | null;
    setError: React.Dispatch<React.SetStateAction<string>>;
    apiCall: <T>(
        method: string,
        endpoint: string,
        headers: Headers,
        body?: object | undefined,
    ) => Promise<T>;
    setRenderPosts: React.Dispatch<React.SetStateAction<boolean>>;
};

export type { CardRenderProps };