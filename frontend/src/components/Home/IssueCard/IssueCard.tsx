import { useEffect, useState } from "react";
import { red } from "@mui/material/colors";
import {
    addUsername,
    handleDate,
    organizeData,
    fetchIssues,
    type Issue,
    type IssueWithUsername,
} from "./functions/functions.ts";
import { useAPI } from "../../../hooks/useAPI";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import streetlight from "./assets/streetlight.jpg";
import Typography from "@mui/material/Typography";
import WarningIcon from "@mui/icons-material/Warning";

type IssueCardProps = {
    renderPosts: boolean;
};

type Payload = {
    id: number;
    iat: number;
    exp: number;
};

type ResType = {
    message: string;
}

export default function IssueCard({ renderPosts }: IssueCardProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [data, setData] = useState<Issue[] | null>(null);
    const [dataOrganized, setDataOrganized] = useState<
        Issue[] | null | undefined
    >(null);
    const [dataWithNames, setDataWithNames] = useState<
        IssueWithUsername[] | null | undefined
    >(null);
    const [deletePost, setDeletePost] = useState<boolean | null>(null);
    const [error, setError] = useState<string>("");
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("token"),
    );
    const [userId, setUserId] = useState<number>(0);

    const { apiCall } = useAPI();

    function handleMenu(e: React.MouseEvent<HTMLElement>) {
        setAnchorEl(e.currentTarget);
    }

    function handleDeletePost(): void {
        setDeletePost(previous => !previous);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    useEffect(() => {
        if (token) {
            const base64URL: string = token.split(".")[1];
            const base64 = base64URL.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                window
                    .atob(base64)
                    .split("")
                    .map(function (c) {
                        return (
                            "%" +
                            ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                        );
                    })
                    .join(""),
            );
            const objectPayload: Payload = JSON.parse(jsonPayload);
            setUserId(objectPayload.id);
        }
    }, [token]);

    useEffect(() => {
        if (!dataOrganized) return;
        const loadUsernames = async () => {
            const result = await addUsername(dataOrganized, apiCall);
            setDataWithNames(result);
        };
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

        fetchIssues(ignore, setError, setData);

        return () => {
            ignore = true;
        };
    }, [renderPosts]);

    useEffect(() => {
        if (deletePost !== null) {

            async function deletePost() {
                const endpoint: string = 'issues/27';
                const requestHeaders = new Headers();
                requestHeaders.set("Content-Type", "application/json");
                
                if (token) {
                    requestHeaders.set("authorization", token);
                }

                try {
                    const response: ResType = await apiCall("DELETE", endpoint, requestHeaders);
                    console.log(response);
                    if (response) {
                        console.log(response.message);
                    }
                } catch {
                    return
                }

            }

            deletePost();

        }
    }, [deletePost]);

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
                                        userId === issue.user_id && (
                                            <>
                                                <IconButton
                                                    aria-label="settings"
                                                    aria-controls="menu-post"
                                                    aria-haspopup="true"
                                                    onClick={handleMenu}
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
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleClose}
                                                >
                                                    <MenuItem
                                                        onClick={handleClose}
                                                        sx={{
                                                            display: "flex",
                                                            p: 1
                                                        }}
                                                    >
                                                        <IconButton aria-label="delete the post"
                                                            sx={{
                                                                flexGrow: 1,
                                                                p: 0,
                                                                display: 'flex',
                                                                direction: 'row',
                                                                justifyContent: 'start',
                                                                alignItems: 'center',
                                                                gap: .5
                                                            }}
                                                        >
                                                            <EditIcon />
                                                            <Typography>
                                                                Edit
                                                            </Typography>
                                                        </IconButton>
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={handleClose}
                                                        sx={{
                                                            display: 'flex',
                                                            p: 1
                                                        }}
                                                    >
                                                        <IconButton aria-label="delete the post"
                                                            sx={{
                                                                flexGrow: 1,
                                                                p: 0,
                                                                display: 'flex',
                                                                direction: 'row',
                                                                justifyContent: 'start',
                                                                alignItems: 'center',
                                                                gap: .5
                                                            }}
                                                            onClick={handleDeletePost}
                                                        >
                                                            <DeleteIcon />
                                                            <Typography>
                                                                Delete
                                                            </Typography>
                                                        </IconButton>
                                                    </MenuItem>
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
