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
import Alert from "@mui/material/Alert";
import WarningIcon from '@mui/icons-material/Warning';
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from '@mui/icons-material/Check';

type Issue = {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    votes: number;
    user_id: number | null;
    createdAt: string;
    updatedAt: string;
};

type IssueResponse = {
    message: string;
    allIssues: Issue[];
}

type IssueCardProps = {
    renderPosts: boolean;
}

const handleDate = (data: string): string => {
    const date: Date = new Date(data);
    const displayDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return displayDate;
}

export default function IssueCard({ renderPosts }: IssueCardProps) {
    
    const [data, setData] = useState<Issue[] | null>(null);
    const [dataOrganized, setDataOrganized] = useState<Issue[] | null>(null);
    const [error, setError] = useState<string>("");
    
    const url: string = "http://127.0.0.1:4000/issues";

    useEffect(() => {

        let ignore: boolean = false;
        
        setData(null);
        setError("");

        async function fetchData<T>(url: string): Promise<T> {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Request failed: HTTP ${res.status}`);
            }

            return (await res.json()) as T;
        }

        async function fetchIssues() {
            try {
                const data = await fetchData<IssueResponse>(url);
                if (ignore) return;
                setError("");
                setData(data.allIssues);
                organizeData(data.allIssues);
            } catch (error: unknown) {
                if (ignore) return;
                
                let message: string = "";
                
                if (error instanceof Error) {
                    message = error.message;
                } else {
                    message = "An unexpected error occurred";
                }
                setData(null);
                setError(message);
                
                console.error("Error fetching issues:", message);
            }
        }

        fetchIssues();

        return () => {
            ignore = true;
        };
    }, [renderPosts]);

    function organizeData(data: Issue[] | null): void {
        if (!data) return;

        let sortedData: Issue[] = [];
        
        sortedData = data.toSorted((a: Issue, b: Issue) => {
            return Date.parse(b.createdAt) - Date.parse(a.createdAt)
        });

        setDataOrganized(sortedData);
    }

    return (

        <>
            <Stack
                spacing={2}
                sx={{
                    alignItems: "center",
                    mt: "1rem",
                }}
            >
                {dataOrganized && dataOrganized.map( (issue: Issue, index: number) => (
                    <div key={index}>
                        <Card 
                            sx={{ 
                                width: "22rem"
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500]}} aria-label="recipe">
                                        {issue.user_id ? issue.user_id : 'R'}
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                title={issue.title}
                                subheader={
                                    <>
                                        @{issue.user_id}
                                        <br />
                                        {handleDate(issue.createdAt)}
                                    </>
                                }
                                
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

                {!error && !data && (
                    <CircularProgress size="3rem" aria-label="loading..." />
                )}

                {data && data.length === 0 && (
                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="warning">
                        <Typography sx={{ typography: 'body1'}}>
                            No issues posted yet
                        </Typography>
                    </Alert>
                )}

                {error && (
                    <Alert icon={<WarningIcon fontSize="inherit" />} severity="error">
                        {error}
                    </Alert>
                )}
            </Stack>
        </>
    );
}
