import { useEffect, useState } from "react";
import { red } from "@mui/material/colors";
import { addUsername, getUsername, handleDate, organizeData} from "./functions/functions.ts";
import { useAPI } from "../../../hooks/useAPI";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Stack from "@mui/material/Stack";
import streetlight from "./assets/streetlight.jpg";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";

type Issue = {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    votes: number;
    user_id: number | null;
    username?: string;
    createdAt: string;
    updatedAt: string;
};


type IssueWithUsername = {
    id: number;
    title: string;
    description: string;
    category: string;
    status: string;
    votes: number;
    user_id: number | null;
    username?: string;
    createdAt: string;
    updatedAt: string;
};

type IssueResponse = {
    message: string;
    allIssues: Issue[];
};

type IssueCardProps = {
    renderPosts: boolean;
};

/*
type User = {
    user_name: string;
};
*/

/*
type APIResponse = {
    message: string;
    user: User;
};

type UserResponse = {
    message: string;
    user: {
        user_name: string;
    };
};
*/

export default function IssueCard({ renderPosts }: IssueCardProps) {
    const [data, setData] = useState<Issue[] | null>(null);
    const [dataOrganized, setDataOrganized] = useState<Issue[] | null | undefined>(null);
    const [dataWithNames, setDataWithNames] = useState<IssueWithUsername[] | null | undefined>(null);
    const [error, setError] = useState<string>("");
    /*
    const [username, setUsername] = useState<string>("");
    */
    const { apiCall } = useAPI();

    const url: string = "http://127.0.0.1:4000/issues";
    /*
    const method: string = "GET";
    const requestHeaders = new Headers();

    requestHeaders.set("Content-Type", "application/json");

    async function getUsername(id: number | null): Promise<string> {
        if (!id) return "Anonymous";
        try {
            const response: APIResponse = await apiCall<UserResponse>(
                method,
                `user/${id}`,
                requestHeaders,
            );
            return response.user.user_name;
        } catch {
            return "Unknown user";
        }
    }

    async function addUsername(data: Issue[] | null): Promise<void> {
        if (!data) return;
        const issuesWithUsernames = await Promise.all(
            data.map(async (issue) => ({
                ...issue,
                username: await getUsername(issue.user_id),
            })),
        );
        setDataWithNames(issuesWithUsernames);
    }

    function handleDate(data: string): string {
        const date: Date = new Date(data);
        const displayDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return displayDate;
    }

    function organizeData(data: Issue[] | null): void {
        if (!data) return;

        let sortedData: Issue[] = [];

        sortedData = data.toSorted((a: Issue, b: Issue) => {
            return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        });

        setDataOrganized(sortedData);
    }
    */

    useEffect(() => {
        if (!dataOrganized) return;
        const loadUsernames = async () => {
            const result = await addUsername(dataOrganized, apiCall);
            setDataWithNames(result);
        }
        loadUsernames();
    }, [dataOrganized]);

    useEffect(() => {
        if (!data) return;
        setDataOrganized(organizeData(data));
    }, [data]);

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
                const response = await fetchData<IssueResponse>(url);
                if (ignore) return;
                setError("");
                setData(response.allIssues);
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

    return (
        <>
            <Stack
                spacing={2}
                sx={{
                    alignItems: "center",
                    mt: "1rem",
                }}
            >
                {dataWithNames &&
                    dataWithNames.map((issue: Issue, index: number) => (
                        <div key={index}>
                            <Card
                                sx={{
                                    width: "22rem",
                                }}
                            >
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            sx={{ bgcolor: red[500] }}
                                            aria-label="recipe"
                                        >
                                            {issue.username
                                                ?.slice(0, 2)
                                                .toUpperCase() || "R"}
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
                                            @{issue.username ?? "Anonymus"}
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
                        </div>
                    ))}

                {!error && !dataWithNames && (
                    <CircularProgress size="3rem" aria-label="loading..." />
                )}

                {dataWithNames && dataWithNames.length === 0 && (
                    <Alert
                        icon={<CheckIcon fontSize="inherit" />}
                        severity="warning"
                    >
                        <Typography sx={{ typography: "body1" }}>
                            No issues posted yet
                        </Typography>
                    </Alert>
                )}

                {error && (
                    <Alert
                        icon={<WarningIcon fontSize="inherit" />}
                        severity="error"
                    >
                        {error}
                    </Alert>
                )}
            </Stack>
        </>
    );
}
