import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Stack from "@mui/material/Stack";
import streetlight from "./assets/streetlight.jpg";
import Chip from "@mui/material/Chip";

type Issue = {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    votes: number;
    userId: number | null;
    createdAt: string;
    updatedAt: string;
};

const handleDate = (data: string): string => {
    const date: Date = new Date(data);
    const displayDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return displayDate;
}

export default function IssueCard() {
    /*
     * Probably display the info of all the cards with a map()
     * Make the fetch from the database probably
     */
    const [data, setData] = useState<Issue[] | null>(null);

    const url: string = "http://127.0.0.1:4000/issues";

    useEffect(() => {

        async function fetchData<T>(url: string): Promise<T> {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Request failed: HTTP ${res.status}`);
            }

            return (await res.json()) as T;
        }

        async function fetchIssues() {
            try {
                const data: any = await fetchData<Issue[]>(url);
                setData(data.allIssues);
            } catch (error: unknown) {
                const message = error instanceof Error
                    ? error.message
                    : "An unexpected error occurred";

                console.error("Error fetching issues:", message);
            }
        }

        fetchIssues();
    }, []);

    return (

        <>
            <Stack
                spacing={2}
                sx={{
                    alignItems: "center",
                    mt: "2rem",
                }}
            >
                {data && data.map( (issue: Issue, index: number) => (
                    <div key={index}>
                        <Card 
                            sx={{ 
                                width: "18rem"
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500]}} aria-label="recipe">
                                        {issue.userId ? issue.userId : 'R'}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={issue.title}
                                subheader={handleDate(issue.createdAt)}
                            />
                            {issue.userId && (
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
                            <CardActions >
                                <Stack
                                    direction="row"
                                    sx={{
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        flexGrow: 1
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        sx = {{
                                            alignItems: "center"
                                        }}
                                    >
                                        <IconButton aria-label="like the content">
                                            <FavoriteIcon />
                                        </IconButton>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: "text.secondary"}}
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
                                        <Chip color="error" size="small" label={issue.category}/>
                                        <Chip color="warning" size="small" label={issue.status}/>

                                    </Stack>

                                </Stack>

                            </CardActions>
                        </Card>
                    </div>
                ))}
            </Stack>
        </>
    );
}
