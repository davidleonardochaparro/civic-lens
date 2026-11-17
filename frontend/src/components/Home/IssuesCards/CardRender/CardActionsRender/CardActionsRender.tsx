import { useEffect, useReducer, useState } from "react";
import type { Issue } from "../../Types/IssuesCardsTypes.ts";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type CardActionsProps = {
    issue: Issue;
    apiCall: <T>(method: string, endpoint: string, headers: Headers, body?: object) => Promise<T>;
    loading: boolean | null;
    setError: React.Dispatch<React.SetStateAction<string>>;
    userId: number;
}

type ResponseGetAPI = {
    message: string;
    issueObject: IssueObject;
}

type IssueObject = {
    category: "string";
    createdAt: "string";
    description: "string";
    id: number;
    status: "string";
    title: "string";
    updatedAt: "string";
    user_id: number | null;
    votes: number;
}

export default function CardActionsRender({ issue, apiCall, loading, setError, userId }: CardActionsProps) {

    const [postUser, setPostUser] = useState<number | null>(null);

    async function handleLike(id: number) {
        console.log('Session user: ', userId);
        if(loading)return;
        setError("");
        const requestHeaders = new Headers();
        requestHeaders.set("Content-Type", "application/json");
        
        try {
            const response: ResponseGetAPI = await apiCall('GET', `issues/${id}`, requestHeaders);
            setPostUser(response.issueObject.user_id);                
        } catch (requestError) {
            setError(
                requestError instanceof Error 
                    ? requestError.message
                    : 'Could not fetch the post info.'
            );
        }
    }   

    return (
        <>
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
                        <IconButton aria-label="like the content"
                            onClick={() => {handleLike(issue.id)}}
                            disabled={userId === issue.user_id ? true : false}
                        >
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
        </>
    );
}
