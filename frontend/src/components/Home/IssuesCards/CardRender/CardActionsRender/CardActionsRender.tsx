import type { Issue } from "../../Types/IssuesCardsTypes.ts";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type CardActionsProps = {
    issue: Issue;
}
export default function CardActionsRender({ issue }: CardActionsProps) {
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
        </>
    );
}
