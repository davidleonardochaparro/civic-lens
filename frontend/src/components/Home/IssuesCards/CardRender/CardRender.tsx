import type { CardRenderProps } from "./Types/CardRenderTypes.ts";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import streetlight from "../assets/streetlight.jpg";
import Typography from "@mui/material/Typography";
import CardHeaderRender from "./CardHeaderRender/CardHeaderRender.tsx";
import CardActionsRender from "./CardActionsRender/CardActionsRender.tsx";
export default function CardRender({
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
                    anchorEl={anchorEl}
                    postId={postId}
                    loading={loading}
                    token={token}
                    setError={setError}
                    apiCall={apiCall}
                    setRenderPosts={setRenderPosts}
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
                <CardActionsRender
                    issue={issue}
                />
            </Card>
        </>
    );
}
