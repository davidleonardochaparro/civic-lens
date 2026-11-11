import React from "react";
import { Link } from "react-router";
import Box from "@mui/material/Box";
import Btn from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SatelliteAltOutlinedIcon from "@mui/icons-material/SatelliteAltOutlined";
import Typography from "@mui/material/Typography";

type LoginProps = {
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    apiPost: (event: React.SubmitEvent<HTMLFormElement>) => void;
};

const labelSx = {
    display: "inline-block",
    marginBottom: "0.5rem",
    font: "inherit",
    letterSpacing: "inherit",
    color: "inherit",
    "&.Mui-focused": {
        color: "inherit",
    },
} as const;

const inputSx = {
    display: "flex",
    padding: 0,
    fontFamily: "inherit",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "normal",
    color: "#212529",
    backgroundColor: "#fff",
    border: "1px solid #dee2e6",
    borderRadius: "0.375rem",
    transition: "border-color .15s ease-in-out, box-shadow .15s ease-in-out",
    "&.Mui-focused": {
        borderColor: "#86b7fe",
        outline: 0,
        boxShadow: "0 0 0 0.25rem rgba(13, 110, 253, 0.25)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        display: "none",
    },
    "& .MuiOutlinedInput-input": {
        boxSizing: "content-box",
        height: "1.5em",
        padding: "0.375rem 0.75rem",
        "&::placeholder": {
            color: "rgba(33, 37, 41, 0.75)",
            opacity: 1,
        },
    },
    "@media (prefers-reduced-motion: reduce)": {
        transition: "none",
    },
} as const;

export default function Login({
    userName,
    setUserName,
    password,
    setPassword,
    apiPost,
}: LoginProps) {
    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
            }}>
                <Btn
                    component={Link}
                    to="/home"
                    color="primary"
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        isolation: "isolate",
                        gap: ".2em",
                        textTransform: "lowercase",
                        transition: "background-color 180ms ease-in-out",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            zIndex: -1,
                            pointerEvents: "none",
                            background:
                                "linear-gradient(110deg, transparent 35%, rgba(25, 118, 210, 0.16) 45%, rgba(255, 255, 255, 0.95) 50%, rgba(25, 118, 210, 0.12) 55%, transparent 65%)",
                            transform: "translateX(-110%)",
                        },
                        "&:hover": {
                            backgroundColor: "rgba(25, 118, 210, 0.08)",
                        },
                        "&:hover::before, &:focus-visible::before, &.Mui-focusVisible::before": {
                            transform: "translateX(110%)",
                            transition: "transform 650ms ease-in-out",
                        },
                        "@media (prefers-reduced-motion: reduce)": {
                            transition: "none",
                            "&::before": {
                                display: "none",
                            },
                        },
                    }}
                >
                    <ArrowBackIcon />
                    <SatelliteAltOutlinedIcon />
                    <Typography
                        variant="h6"
                        noWrap
                        component="span"
                        sx={{
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".2rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        civic-lens
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        component="span"
                        sx={{
                            display: "flex",
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".2rem",
                            color: "inherit",
                            textDecoration: "none",
                            alignSelf: "flex-end",
                        }}
                    >
                        home
                    </Typography>
                </Btn>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    height: "75vh",
                    margin: "0 -0.75rem",
                }}
            >
                <Box
                    sx={{
                        flex: "1 0 0%",
                        width: "100%",
                        maxWidth: "100%",
                        padding: "0 0.75rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        component="p"
                        variant="inherit"
                        sx={{
                            margin: "0 0 3rem",
                            fontSize: "calc(1.375rem + 1.5vw)",
                            fontWeight: 400,
                            lineHeight: 1.2,
                            "@media (min-width:1200px)": {
                                fontSize: "2.5rem",
                            },
                        }}
                    >
                        Login
                    </Typography>
                    <Box
                        component="form"
                        sx={{ width: "50%" }}
                        onSubmit={apiPost}
                    >
                        <FormControl
                            fullWidth
                            sx={{ display: "block", marginBottom: "1rem" }}
                        >
                            <FormLabel
                                htmlFor="validationCustomUsername"
                                sx={labelSx}
                            >
                                Username or email
                            </FormLabel>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <InputAdornment
                                    component="span"
                                    position="start"
                                    disableTypography
                                    id="inputGroupPrepend"
                                    sx={{
                                        margin: 0,
                                        height: "auto",
                                        maxHeight: "none",
                                        padding: "0.375rem 0.75rem",
                                        fontFamily: "inherit",
                                        fontSize: "1rem",
                                        fontWeight: 400,
                                        lineHeight: 1.5,
                                        color: "#212529",
                                        backgroundColor: "#f8f9fa",
                                        border: "1px solid #dee2e6",
                                        borderRadius: "0.375rem 0 0 0.375rem",
                                    }}
                                >
                                    @
                                </InputAdornment>
                                <OutlinedInput
                                    id="validationCustomUsername"
                                    type="text"
                                    placeholder="e.g. pedro.fonseca1"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    slotProps={{
                                        input: {
                                            minLength: 6,
                                            maxLength: 22,
                                            pattern: "[a-zA-Z0-9. ]+",
                                        },
                                    }}
                                    value={userName}
                                    onChange={(event) => {
                                        setUserName(event.target.value);
                                    }}
                                    sx={{
                                        ...inputSx,
                                        flex: "1 1 auto",
                                        width: "1%",
                                        minWidth: 0,
                                        marginLeft: "-1px",
                                        borderRadius: "0 0.375rem 0.375rem 0",
                                        "&.Mui-focused": {
                                            ...inputSx["&.Mui-focused"],
                                            zIndex: 1,
                                        },
                                    }}
                                />
                            </Box>
                            <FormHelperText
                                error
                                sx={{
                                    display: "none",
                                    margin: "0.25rem 0 0",
                                    fontFamily: "inherit",
                                    fontSize: "0.875em",
                                    lineHeight: "inherit",
                                    letterSpacing: "inherit",
                                    "&.Mui-error": {
                                        color: "#dc3545",
                                    },
                                }}
                            >
                                Please choose a username.
                            </FormHelperText>
                        </FormControl>

                        <FormControl
                            fullWidth
                            sx={{ display: "block", marginBottom: "1rem" }}
                        >
                            <FormLabel htmlFor="formBasicPassword" sx={labelSx}>
                                Password
                            </FormLabel>
                            <OutlinedInput
                                id="formBasicPassword"
                                fullWidth
                                type="password"
                                placeholder=" * * * * * * *"
                                slotProps={{
                                    input: {
                                        minLength: 8,
                                        maxLength: 16,
                                    },
                                }}
                                required
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                                sx={inputSx}
                            />
                        </FormControl>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginBottom: "1.5rem",
                            }}
                        >
                            <Typography
                                component="p"
                                variant="inherit"
                                sx={{ margin: "0 0 1rem" }}
                            >
                                <Box
                                    component={Link}
                                    to={"/auth/reset"}
                                    sx={{
                                        color: "#0d6efd",
                                        textDecoration: "underline",
                                        textDecorationColor: "rgba(13, 110, 253, 0.25)",
                                        textUnderlineOffset: "0.2em",
                                        "&:focus": {
                                            color: "#0a58ca",
                                            textDecorationColor: "rgba(10, 88, 202, 0.25)",
                                        },
                                        "&:hover": {
                                            color: "#0a58ca",
                                            textDecorationColor: "#0a58ca",
                                        },
                                    }}
                                >
                                    Reset password
                                </Box>
                            </Typography>
                        </Box>

                        <Btn
                            fullWidth
                            variant="contained"
                            disableElevation
                            disableRipple
                            type="submit"
                            sx={{
                                marginBottom: "1rem",
                                minWidth: 0,
                                padding: "0.375rem 0.75rem",
                                fontFamily: "inherit",
                                fontSize: "1rem",
                                fontWeight: 400,
                                lineHeight: 1.5,
                                letterSpacing: "normal",
                                textTransform: "none",
                                color: "#fff",
                                backgroundColor: "#0d6efd",
                                border: "1px solid #0d6efd",
                                borderRadius: "0.375rem",
                                transition:
                                    "color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out",
                                "&:hover": {
                                    backgroundColor: "#0b5ed7",
                                    borderColor: "#0a58ca",
                                },
                                "&:focus-visible, &.Mui-focusVisible": {
                                    backgroundColor: "#0b5ed7",
                                    borderColor: "#0a58ca",
                                    outline: 0,
                                    boxShadow:
                                        "0 0 0 0.25rem rgba(49, 132, 253, 0.5)",
                                },
                                "&:active": {
                                    backgroundColor: "#0a58ca",
                                    borderColor: "#0a53be",
                                },
                                "@media (prefers-reduced-motion: reduce)": {
                                    transition: "none",
                                },
                            }}
                        >
                            Submit
                        </Btn>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                component="p"
                                variant="inherit"
                                sx={{ margin: "0 0 1rem" }}
                            >
                                Don't have an account?{" "}
                                <Box
                                    component={Link}
                                    to={"/auth/register"}
                                    sx={{
                                        color: "#0d6efd",
                                        textDecoration: "underline",
                                        textDecorationColor: "rgba(13, 110, 253, 0.25)",
                                        textUnderlineOffset: "0.2em",
                                        "&:focus": {
                                            color: "#0a58ca",
                                            textDecorationColor: "rgba(10, 88, 202, 0.25)",
                                        },
                                        "&:hover": {
                                            color: "#0a58ca",
                                            textDecorationColor: "#0a58ca",
                                        },
                                    }}
                                >
                                    Sign up
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
