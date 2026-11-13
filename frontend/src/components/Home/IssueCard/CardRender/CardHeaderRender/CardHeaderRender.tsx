import { useState } from "react";
import type { CardHeaderProps } from "../Types/Types.ts";
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
import DialogRender from "./DialogRender/DialogRender.tsx";

export default function CardHeaderRender({
    issue,
    userId,
    setPostId,
    setAnchorEl,
    handleMenu,
    anchorEl,
    postId,
    handleClose,
    handleDeletePost,
    loading,
    token,
    setError,
    apiCall,
    setRenderPosts,
    handleDate,
}: CardHeaderProps) {

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    
        function handleDialogOpen() {
            setOpenDialog(true);
        }
    
        function handleDialogClose() {
            setOpenDialog(false);
            handleClose(setAnchorEl);
        };
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
                                <DialogRender 
                                    openDialog={openDialog}
                                    handleDialogClose={handleDialogClose}
                                    handleDeletePost={handleDeletePost}
                                    postId={postId}
                                    loading={loading}
                                    token={token}
                                    setError={setError}
                                    apiCall={apiCall}
                                    setAnchorEl={setAnchorEl}
                                    setRenderPosts={setRenderPosts}
                                />
                            </Menu>
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
