import Box from "@mui/material/Box";
import Button from "@mui/material/Button"; 
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { useState } from "react";

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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                                <Typography id="transition-modal-title" variant="h6" component="h2">
                                    Text in a modal
                                </Typography>
                                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                </Typography>
                            </Box>
                        </Fade>

                    </Modal>
                </Box>
            </Box>
        </>
    );
}
