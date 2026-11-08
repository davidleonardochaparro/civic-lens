import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"; 
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const style = {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function NewIssue() {
    const [open, setOpen] = useState<boolean>(false);
    const [category, setCategory] = useState<string>("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    mt: "1rem"
                }}
            >
                <Box
                    sx={{
                        width: "21rem",
                    }}
                    >
                    <Button
                        sx={{
                            textTransform: "none"
                        }}
                        variant="contained"
                        color="secondary"
                        onClick={handleOpen}
                    >

                        Add new issue
                    </Button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500
                            }
                        }}
                    >
                        <Fade in={open}>
                            <Box
                                sx={style}    
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="Issue's Title"
                                    variant="outlined"
                                />
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={category}
                                            label="Category"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="community">Community</MenuItem>
                                            <MenuItem value="safety">Safety</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Typography id="transition-modal-title" variant="h6" component="h2">
                                    Issue's description
                                </Typography>
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={2}
                                    placeholder="Describe the issue you encountered"
                                    style={{ width: "18rem"}}
                                />
                                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                    Here will be the drag and drop image option.
                                </Typography>
                                <Button variant="contained">Submit</Button>
                            </Box>
                        </Fade>

                    </Modal>
                </Box>
            </Box>
        </>
    );
}
