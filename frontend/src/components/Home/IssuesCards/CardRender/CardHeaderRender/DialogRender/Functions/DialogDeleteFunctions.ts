import { handleClose } from "../../Functions/CardHeaderFunctions";

// Deletes the post from the database with the apiCall() hook
export async function handleDeletePost(
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
        const res = await apiCall(
            "DELETE",
            `issues/${postId}`,
            requestHeaders,
        );
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
