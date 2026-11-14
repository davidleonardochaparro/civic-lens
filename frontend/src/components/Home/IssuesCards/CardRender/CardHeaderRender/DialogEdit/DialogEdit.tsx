import React from "react";
import { useState, useEffect } from "react";
import { useAPI } from "../../../../../../hooks/useAPI";
import {
    handleChange,
    handleEditPost,
} from "./Functions/DialogEditFunctions.ts";
import type { TransitionProps } from "@mui/material/transitions";
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
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

type DialogEditProps = {
    initTitle: string;
    initCategory: string;
    initDescription: string;
    openEditDialog: boolean;
    closeEditDialog: () => void;
    postId: number | null;
    loading: boolean | null;
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
    initTitle,
    initCategory,
    initDescription,
    openEditDialog,
    closeEditDialog,
    postId,
    loading,
    setAnchorEl,
    setRenderPosts,
    setError,
}: DialogEditProps) {
    
    const [issueEditTitle, setIssueEditTitle] = useState<string | null>(null);
    const [category, setCategory] = useState<string | null>(null);
    const [issueDescription, setIssueDescription] = useState<string | null>(
        null,
    );

    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("token"),
    );

    const { apiCall } = useAPI();

    return (
        <>
            <Dialog
                open={openEditDialog}
                onClose={closeEditDialog}
                slots={{ transition: Transition }}
            >
                <DialogTitle>Issue Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit the issue's title, category, description and an
                        optional image.
                    </DialogContentText>
                    <form
                        onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => {
                            handleEditPost(
                                e,
                                token,
                                setError,
                                postId,
                                loading,
                                issueEditTitle,
                                category,
                                issueDescription,
                                apiCall,
                                setAnchorEl,
                                setRenderPosts,
                                closeEditDialog,
                            );
                        }}
                        id="issue-edit-form"
                    >
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
                                placeholder={"whatever"}
                                value={issueEditTitle ?? initTitle}
                                // value={initTitle}
                                onChange={(event) => {
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
                                    value={category ?? initCategory}
                                    onChange={(e: SelectChangeEvent) => {handleChange(e, setCategory)}}
                                    required
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
                                    value={issueDescription ?? initDescription}
                                    onChange={(e) => {
                                        setIssueDescription(e.target.value);
                                    }}
                                    minRows={3}
                                    placeholder=" Write the description here..."
                                    style={{ width: "100%" }}
                                    required
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
                        <Button onClick={closeEditDialog}>Cancel</Button>
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
