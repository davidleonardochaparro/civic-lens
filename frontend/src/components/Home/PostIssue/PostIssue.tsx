import React from "react";
import { useState } from "react";
import type { TransitionProps } from "@mui/material/transitions";
import type { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Slide from "@mui/material/Slide";
import ImgUpload from "./ImgUpload/ImgUpload";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface SimpleDialogProps {
    open: boolean;
    handleClose: () => void;
}

function SimpleDialog(props: SimpleDialogProps) {
    const [category, setCategory] = useState<string>("");

    const { handleClose, open } = props;

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const title = formJson.title;
        console.log(title);
        handleClose();
    };

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
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
                    <form onSubmit={handleSubmit} id="issue-form">
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
                                    gap: .5
                                }}
                            >
                                <DialogContentText>
                                    Description:
                                </DialogContentText>
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder=" Write the description here..."
                                    style={{ width: "100%" }}
                                    required
                                />
                            </Box>

                            <Box
                                sx={{
                                    width: "100%",
                                    mt: ".7rem"
                                }}
                            >
                                <DialogContentText>
                                    Photo:
                                </DialogContentText>

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
                            p: ".3rem"
                        }}
                    >
                        <Button type="submit" form="issue-form" variant="contained"
                            sx={{
                                flexGrow: 1
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

export default function PostIssue() {
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
                    <SimpleDialog open={open} handleClose={handleClose} />
                </Box>
            </Box>
        </>
    );
}
