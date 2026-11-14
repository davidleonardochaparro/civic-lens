import { useState } from "react";
import type { CardRenderProps } from "../Types/CardRenderTypes.ts";
import {
    handleClose,
    handleMenu,
    handleDate,
} from "./Functions/CardHeaderFunctions.ts";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";

import DialogRender from "./DialogRender/DialogDelete.tsx";
import DialogEdit from "./DialogEdit/DialogEdit.tsx"

export default function CardHeaderRender({
    issue,
    userId,
    setPostId,
    setAnchorEl,
    anchorEl,
    postId,
    loading,
    token,
    setError,
    apiCall,
    setRenderPosts,
}: CardRenderProps) {

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    
        function handleDialogOpen() {
            handleClose(setAnchorEl);
            setOpenDialog(true);
        }
    
        function handleDialogClose() {
            setOpenDialog(false);
            handleClose(setAnchorEl);
        };
        
        function editDialogOpen() {
            handleClose(setAnchorEl);
            setOpenEditDialog(true);
        }

        function closeEditDialog() {
            setOpenEditDialog(false);
            handleClose(setAnchorEl);
        }
    return (
        <>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {issue.username?.slice(0, 2).toUpperCase() || "R"}
                    </Avatar>
                }
                action={
                    userId === issue.user_id && (
                        <>
                            <IconButton
                                aria-label="settings"
                                aria-controls="menu-post"
                                aria-haspopup="true"
                                onClick={(e) =>
                                    handleMenu(
                                        e,
                                        issue.id,
                                        setPostId,
                                        setAnchorEl,
                                    )
                                }
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                elevation={1}
                                id="menu-post"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorEl) && postId === issue.id}
                                onClose={() => {
                                    handleClose(setAnchorEl);
                                }}
                            >
                                <IconButton
                                    aria-label="delete the post"
                                    sx={{
                                        flexGrow: 1,
                                        p: 0,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    onClick={editDialogOpen}
                                    disabled={Boolean(loading)}
                                >
                                    <MenuItem
                                        sx={{
                                            p: 1,
                                            pr: 4,
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "start",
                                            alignItems: "center",
                                            gap: 0.2,
                                        }}
                                    >
                                        <EditIcon />
                                        <Typography>Edit</Typography>
                                    </MenuItem>
                                </IconButton>
                                <IconButton
                                    aria-label="delete the post"
                                    size="large"
                                    sx={{
                                        flexGrow: 1,
                                        p: 0,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    
                                    onClick={handleDialogOpen}
                                    disabled={Boolean(loading)}
                                >
                                    <MenuItem
                                        sx={{
                                            p: 1,
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: 0.2,
                                        }}
                                    >
                                        <DeleteIcon />
                                        <Typography>Delete</Typography>
                                    </MenuItem>
                                </IconButton>
                            </Menu>
                            <DialogEdit
                                openEditDialog={openEditDialog}
                                closeEditDialog={closeEditDialog}
                                postId={postId}
                                loading={loading}
                                setAnchorEl={setAnchorEl}
                                setRenderPosts={setRenderPosts}
                                setError={setError}
                            />
                            <DialogRender 
                                openDialog={openDialog}
                                handleDialogClose={handleDialogClose}
                                postId={postId}
                                loading={loading}
                                token={token}
                                setError={setError}
                                apiCall={apiCall}
                                setAnchorEl={setAnchorEl}
                                setRenderPosts={setRenderPosts}
                            />
                        </>
                    )
                }
                title={issue.title}
                subheader={
                    <>
                        @{issue.username ?? "Anonymus"}
                        <br />
                        {handleDate(issue.createdAt)}
                    </>
                }
            />
        </>
    );
}
