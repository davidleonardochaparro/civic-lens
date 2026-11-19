import { useState } from "react";
import type { Issue, VoteResponse } from "../../Types/IssuesCardsTypes.ts";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type CardActionsProps = {
    issue: Issue;
    apiCall: <T>(method: string, endpoint: string, headers: Headers, body?: object) => Promise<T>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    userId: number;
    token: string | null;
    handleVoteUpdated: (response: VoteResponse) => void;
}

export default function CardActionsRender({ issue, apiCall, setError, userId, token, handleVoteUpdated }: CardActionsProps) {

    const [isVoting, setIsVoting] = useState<boolean>(false);
    const isAuthor = userId === issue.user_id;
    const canVote = Boolean(token) && userId > 0 && !isAuthor;

    async function handleVote() {
        if (!token || !canVote || isVoting) return;

        const method = issue.hasVoted ? "DELETE" : "PUT";
        const endpoint = `issues/${issue.id}/vote`;
        const headers = new Headers({
            Authorization: `Bearer ${token}`,
        });

        setIsVoting(true);
        setError("");

        try {
            const response = await apiCall<VoteResponse>(method, endpoint, headers);
            handleVoteUpdated(response);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Could not update your vote.");
        } finally {
            setIsVoting(false);
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
                        <IconButton
                            aria-label="Like issue"
                            aria-pressed={issue.hasVoted}
                            onClick={handleVote}
                            disabled={!canVote || isVoting}
                            color={issue.hasVoted ? "error" : "default"}
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
