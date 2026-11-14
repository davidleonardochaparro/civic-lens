import { useState } from "react";
import { useAPI } from "../../../../../../hooks/useAPI";
import { handleClose } from "../../../functions/functions";
import type { TransitionProps } from "@mui/material/transitions";
import type { SelectChangeEvent } from "@mui/material/Select";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ImgUpload from "./ImgUpload/ImgUpload";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

type PutBody = {
    title: string;
    description: string;
    category: string;
    status: string;
} 

type DialogEditProps = {
    openEditDialog: boolean;
    closeEditDialog: () => void;
    setError: React.Dispatch<React.SetStateAction<string>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    setRenderPosts: React.Dispatch<React.SetStateAction<boolean>>;
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogEdit({
    openEditDialog,
    closeEditDialog,
    setAnchorEl,
    setRenderPosts,
    setError,
}: DialogEditProps) {
    const [issueEditTitle, setIssueEditTitle] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [issueDescription, setIssueDescription] = useState<string>("");
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("token"),
    );

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    const { apiCall } = useAPI();

    async function handleEditPost(e: React.SubmitEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        if (!token) {
            setError("Please sign in before deleting a post.");
            return;
        }
        setError("");

        const formData = new FormData(e.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());

        const body: PutBody = {
            title: issueEditTitle,
            description: issueDescription,
            category: category,
            status: 'created',
        }

        const requestHeaders = new Headers();
        requestHeaders.set("Content-Type", "application/json");
        requestHeaders.set("authorization", token);
        const testId: number = 28;

        try {
            const res = await apiCall(
                "PUT",
                `issues/${testId}`,
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

    return (
        <>
            <Dialog
                open={openEditDialog}
                onClose={closeEditDialog}
                slots={{ transition: Transition }}
                keepMounted
            >
                <DialogTitle>Issue Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit the issue's title, category, description and an
                        optional image.
                    </DialogContentText>
                    <form onSubmit={handleEditPost} id="issue-edit-form">
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <TextField
                                id="issue-edit-title"
                                name="title-edit"
                                value={issueEditTitle}
                                onChange={event => {
                                    setIssueEditTitle(event.target.value);
                                }}
                                label="Issue title"
                                variant="standard"
                                margin="dense"
                                required
                                fullWidth
                            />
                            <FormControl
                                variant="standard"
                                sx={{ m: 2, minWidth: 120 }}
                                margin="dense"
                                fullWidth
                                
                            >
                                <InputLabel id="demo-edit-select-standard-label">
                                    Category
                                </InputLabel>
                                <Select
                                    labelId="demo-edit-select-standard-label"
                                    id="demo-edit-select-standard-label"
                                    value={category}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="community">
                                        Community
                                    </MenuItem>
                                    <MenuItem value="safety">Safety</MenuItem>
                                </Select>
                            </FormControl>

                            <Box
                                sx={{
                                    width: "100%",
                                    mt: ".7rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 0.5,
                                }}
                            >
                                <DialogContentText>
                                    Description:
                                </DialogContentText>
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    value={issueDescription}
                                    onChange={(e) => {
                                        setIssueDescription(e.target.value);
                                    }}
                                    minRows={3}
                                    placeholder=" Write the description here..."
                                    style={{ width: "100%" }}
                                    
                                />
                            </Box>

                            <Box
                                sx={{
                                    width: "100%",
                                    mt: ".7rem",
                                }}
                            >
                                <DialogContentText>Photo:</DialogContentText>

                                <ImgUpload />
                            </Box>
                        </Box>
                    </form>
                </DialogContent>

                <DialogActions>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "end",
                            gap: 2,
                            p: ".3rem",
                            pr: "1rem",
                        }}
                    >
                        <Button
                            onClick={closeEditDialog}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="issue-edit-form"
                            variant="contained"
                        >
                            Save
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
}
