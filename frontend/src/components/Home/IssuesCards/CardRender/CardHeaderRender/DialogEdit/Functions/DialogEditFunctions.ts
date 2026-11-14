import React from "react";
import { handleClose } from "../../Functions/CardHeaderFunctions";
import type { SelectChangeEvent } from "@mui/material/Select";

type PutBody = {
    title: string | null;
    category: string | null;
    description: string | null;
    status: string;
} 

const handleChange = (event: SelectChangeEvent, setCategory: React.Dispatch<React.SetStateAction<string | null>>) => {
    setCategory(event.target.value);
};

async function handleEditPost(
    e: React.SubmitEvent<HTMLFormElement>,
    token: string | null,
    setError: React.Dispatch<React.SetStateAction<string>>,
    postId: number | null,
    loading: boolean | null,
    issueEditTitle: string | null,
    category: string | null,
    issueDescription: string | null,
    apiCall: <T>(method: string, endpoint: string, headers: Headers, body?: object) => Promise<T>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    setRenderPosts: React.Dispatch<React.SetStateAction<boolean>>,
    closeEditDialog: () => void
): Promise<void> {
    e.preventDefault();
    if (!token) {
        setError("Please sign in before deleting a post.");
        return;
    }
    if (!postId) {
        setError("Issue doesn' have an id");
        return;
    }
    if (loading) return;

    setError("");

    const body: PutBody = {
        title: issueEditTitle,
        category: category,
        description: issueDescription,
        status: 'created',
    }

    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("authorization", token);

    try {
        const res = await apiCall(
            "PUT",
            `issues/${postId}`,
            requestHeaders,
            body
        );
        console.log(res);
        handleClose(setAnchorEl);
        setRenderPosts((prev) => !prev);
        closeEditDialog();
    } catch (caughtError) {
        setError(
            caughtError instanceof Error
                ? caughtError.message
                : "Could not delete the post.",
        );
    }
}

export {handleChange, handleEditPost};