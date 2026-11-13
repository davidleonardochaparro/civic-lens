import type { Issue } from "../../functions/functions.ts";

type CardHeaderProps = {
    issue: Issue;
    userId: number;
    setPostId: React.Dispatch<React.SetStateAction<number | null>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    handleMenu: (
        e: React.MouseEvent<HTMLElement>,
        id: number,
        setPostId: React.Dispatch<React.SetStateAction<number | null>>,
        setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    ) => void;
    anchorEl: HTMLElement | null;
    postId: number | null;
    handleClose: (
        setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    ) => void;
    handleDeletePost: (
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
    ) => Promise<void>;
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
    handleDate: (data: string) => string;
};

export { type CardHeaderProps };