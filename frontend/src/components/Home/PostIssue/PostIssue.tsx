import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { useAPIPost } from "../../../hooks/useAPIPost.ts";
import type { TransitionProps } from "@mui/material/transitions";
import type { SelectChangeEvent } from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import ImgUpload from "./ImgUpload/ImgUpload";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

type PostIssueProps = {
    renderPosts: boolean;
    setRenderPosts: React.Dispatch<React.SetStateAction<boolean>>;
}

type SimpleDialogProps = PostIssueProps & {
    open: boolean;
    handleClose: () => void;
}

type PostBody = {
    title: string;
    description: string;
    category: string;
    status: string;
    votes: number;
};

type APIResponse = {
    message: string;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function SimpleDialog({ renderPosts, setRenderPosts, open, handleClose}: SimpleDialogProps) {
    const [issueTitle, setIssueTitle] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [issueDescription, setIssueDescription] = useState<string>("");
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [alert, setAlert] = useState<boolean>(false);

    const { post, loading, error } = useAPIPost();

    const requestHeaders = new Headers();
        
    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };
    
    const apiPost = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {

        setAlert(false);
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const title = formJson.title;

        const endpoint: string = "issues";
        const body: PostBody = {
            title: issueTitle,
            description: issueDescription,
            category: category,
            status: "created",
            votes: 0,
        };
        
        if (!token) {
            setAlert(true);
            return;
        }

        requestHeaders.set("Content-Type", "application/json");
        requestHeaders.set("authorization", token);
        
        try {
            const data: APIResponse = await post(endpoint, body, requestHeaders);
            console.log(data);
            setRenderPosts(previous => !previous);
            handleClose();
        } catch { }

    };

    return (
        <>

            <Dialog
                open={open}
                onClose={handleClose}
                slots={{
                    transition: Transition,
                }}
                keepMounted
            >

                <DialogTitle>Issue details</DialogTitle>
                {alert && (
                    <Alert severity="warning">
                        Just authenticated users can post an issue, you have to 
                        <Link to={"/auth/login"}> log-in</Link> or <Link to={"/auth/register"}>register</Link>.
                    </Alert>
                )}
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent>
                    <DialogContentText>
                        Bring the issue's title, category, description and an
                        optional image.
                    </DialogContentText>
                    <form onSubmit={apiPost} id="issue-form">
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <TextField
                                id="issue-title"
                                name="title"
                                value={issueTitle}
                                onChange={e => {setIssueTitle(e.target.value)}}
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
                                required
                            >
                                <InputLabel id="demo-simple-select-standard-label">
                                    Category
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
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
                                    onChange={e => {setIssueDescription(e.target.value)}}
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
                            p: ".3rem",
                        }}
                    >
                        <Button
                            type="submit"   
                            form="issue-form"
                            variant="contained"
                            sx={{
                                flexGrow: 1,
                            }}
                        >
                            Submit issue
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default function PostIssue({ renderPosts, setRenderPosts}: PostIssueProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    mt: "1rem",
                }}
            >
                <Box
                    sx={{
                        width: "21rem",
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpen}
                        sx={{
                            textTransform: "none",
                        }}
                    >
                        Add new issue
                    </Button>
                    <SimpleDialog renderPosts={renderPosts} setRenderPosts={setRenderPosts} open={open} handleClose={handleClose} />
                </Box>
            </Box>
        </>
    );
}
