import type { CardHeaderProps } from "./Types/Types.ts";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import streetlight from "../assets/streetlight.jpg";
import Typography from "@mui/material/Typography";
import CardHeaderRender from "./CardHeaderRender/CardHeaderRender.tsx";

export default function CardRender({
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
    return (
        <>
            <Card
                sx={{
                    width: "22rem",
                }}
            >
                <CardHeaderRender
                    issue={issue}
                    userId={userId}
                    setPostId={setPostId}
                    setAnchorEl={setAnchorEl}
                    handleMenu={handleMenu}
                    anchorEl={anchorEl}
                    postId={postId}
                    handleClose={handleClose}
                    handleDeletePost={handleDeletePost}
                    loading={loading}
                    token={token}
                    setError={setError}
                    apiCall={apiCall}
                    setRenderPosts={setRenderPosts}
                    handleDate={handleDate}
                />

                {issue.user_id && (
                    <CardMedia
                        component="img"
                        height="194"
                        image={streetlight}
                        alt="Broken streetlight"
                    />
                )}
                <CardContent>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        {issue.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexGrow: 1,
                        }}
                    >
                        <Stack
                            direction="row"
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <IconButton aria-label="like the content">
                                <FavoriteIcon />
                            </IconButton>
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                            >
                                {issue.votes}
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                mr: 1,
                            }}
                        >
                            <Chip
                                color="error"
                                size="small"
                                label={issue.category}
                            />
                            <Chip
                                color="warning"
                                size="small"
                                label={issue.status}
                            />
                        </Stack>
                    </Stack>
                </CardActions>
            </Card>
        </>
    );
}
