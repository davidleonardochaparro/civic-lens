import { useState } from "react";
import type { TransitionProps } from "@mui/material/transitions";
import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type DialogRenderProps = {
    openDialog: boolean;
    handleDialogClose: () => void;
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
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
    setRenderPosts: React.Dispatch<React.SetStateAction<boolean>>
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogRender({
    openDialog,
    handleDialogClose,
    handleDeletePost, 
    postId, 
    loading,
    token,
    setError,
    apiCall,
    setAnchorEl,
    setRenderPosts,
}: DialogRenderProps) {

    return (
        <>
            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                slots={{
                    transition: Transition
                }}
                keepMounted
            >
                <DialogTitle>Are you sure to delete this post?</DialogTitle>
                <DialogContent>
                    After deleting you won't be able to retrieve this post. 
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            handleDeletePost(
                                postId,
                                loading,
                                token,
                                setError,
                                apiCall,
                                setAnchorEl,
                                setRenderPosts,
                            );
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
