import { useEffect, useState } from "react";
import type {
    IssuesCardsProps,
    Issue,
    IssueWithUsername,
} from "./Types/IssuesCardsTypes.ts";
import {
    addUsername,
    organizeData,
    fetchIssues,
    decodeToken,
} from "./Functions/IssuesCardsFunctions.ts";
import { useAPI } from "../../../hooks/useAPI.ts";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import WarningIcon from "@mui/icons-material/Warning";
import CardRender from "./CardRender/CardRender.tsx";

export default function IssuesCards({
    renderPosts,
    setRenderPosts,
}: IssuesCardsProps) {

    //State variables
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [data, setData] = useState<Issue[] | null>(null);
    const [dataOrganized, setDataOrganized] = useState<
        Issue[] | null | undefined
    >(null);
    const [dataWithNames, setDataWithNames] = useState<
        IssueWithUsername[] | null | undefined
    >(null);

    const [error, setError] = useState<string>("");
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("token"),
    );
    const [userId, setUserId] = useState<number>(0);
    const [postId, setPostId] = useState<number | null>(null);

    // Hook call
    const { apiCall, loading } = useAPI();

    // Decode the JWT token
    useEffect(() => {
        if (token) {
            decodeToken(token, setUserId);
        }
    }, [token]);

    // Fetches all the issues from the database
    useEffect(() => {
        let ignore: boolean = false;

        setData(null);
        setError("");

        fetchIssues(ignore, setError, setData);

        return () => {
            ignore = true;
        };

    }, [renderPosts]);

    // Organize the data to display the most recient post first
    useEffect(() => {
        if (!data) return;
        setDataOrganized(organizeData(data));
    }, [data]);
    
    // Sets the array of post with all the post data AND now the username
    useEffect(() => {
        if (!dataOrganized) return;
        const loadUsernames = async () => {
            const result = await addUsername(dataOrganized, apiCall);
            setDataWithNames(result);
        };
        loadUsernames();
    }, [dataOrganized]);

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
                    dataWithNames.map((issue: Issue) => (
                        <div key={issue.id} id={String(issue.id)}>
                            <CardRender
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
