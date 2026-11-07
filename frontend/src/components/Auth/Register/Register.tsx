import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import Box from "@mui/material/Box";
import Btn from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SatelliteAltOutlinedIcon from "@mui/icons-material/SatelliteAltOutlined";
import Typography from "@mui/material/Typography";

type RegisterProps = {
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
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

const nameFieldSx = {
    display: "block",
    flex: "1 0 0%",
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    padding: "0 0.75rem",
} as const;

const helperSx = {
    display: "inline",
    marginTop: "0.25rem",
    fontSize: "0.875em",
    color: "rgba(33, 37, 41, 0.75)",
} as const;

const checkboxRowSx = {
    minHeight: "1.5rem",
    paddingLeft: "1.5em",
    marginBottom: "0.125rem",
} as const;

const checkboxLabelSx = {
    display: "inline",
    margin: 0,
    padding: 0,
    font: "inherit",
    letterSpacing: "inherit",
    verticalAlign: "baseline",
    cursor: "default",
} as const;

const checkboxSx = {
    boxSizing: "border-box",
    width: "1em",
    height: "1em",
    padding: 0,
    float: "left",
    marginTop: "0.25em",
    marginLeft: "-1.5em",
    fontSize: "inherit",
    verticalAlign: "top",
    color: "#fff",
    backgroundColor: "#fff",
    border: "1px solid #dee2e6",
    borderRadius: "0.25em",
    cursor: "default",
    transition: "none",
    "&:hover": {
        backgroundColor: "#fff",
    },
    "&:focus-within": {
        borderColor: "#86b7fe",
        outline: 0,
        boxShadow: "0 0 0 0.25rem rgba(13, 110, 253, 0.25)",
    },
    "&.Mui-checked, &.Mui-checked:hover": {
        color: "#fff",
        backgroundColor: "#0d6efd",
        borderColor: "#0d6efd",
    },
    "&:active": {
        filter: "brightness(90%)",
    },
} as const;

const checkboxIcon = <Box component="span" />;

const checkedCheckboxIcon = (
    <SvgIcon
        viewBox="0 0 16 16"
        sx={{ fontSize: "inherit", width: "100%", height: "100%" }}
    >
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="m4 8 3 3 5-6"
        />
    </SvgIcon>
);

export default function Register({
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    apiPost,
}: RegisterProps) {
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    const handleName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const nextName = event.target.value;
        setName(nextName);
        craftUsername(nextName, lastName);
    };

    const handleLastName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const nextLastName = event.target.value;
        setLastName(nextLastName);
        craftUsername(name, nextLastName);
    };

    const craftUsername = (firstName: string, surname: string) => {
        const generatedUsername = `${firstName.trim()}.${surname.trim()}`
            .toLowerCase()
            .replace(/\s/g, "");

        setUserName(generatedUsername);
    };

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
                        Register
                    </Typography>

                    <Box
                        component="form"
                        sx={{ width: "50%" }}
                        onSubmit={apiPost}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                margin: "0 -0.75rem 1rem",
                            }}
                        >
                            <FormControl fullWidth sx={nameFieldSx}>
                                <FormLabel htmlFor="formBasicName" sx={labelSx}>
                                    Name(s)
                                </FormLabel>
                                <OutlinedInput
                                    id="formBasicName"
                                    fullWidth
                                    type="text"
                                    placeholder="e.g. Pedro"
                                    required
                                    slotProps={{
                                        input: {
                                            minLength: 3,
                                            maxLength: 10,
                                            pattern: "[a-zA-Z ]*[a-zA-Z][a-zA-Z ]*",
                                        },
                                    }}
                                    value={name}
                                    onChange={handleName}
                                    sx={inputSx}
                                />
                            </FormControl>

                            <FormControl fullWidth sx={nameFieldSx}>
                                <FormLabel htmlFor="formBasicLastName" sx={labelSx}>
                                    Last Name
                                </FormLabel>
                                <OutlinedInput
                                    id="formBasicLastName"
                                    fullWidth
                                    type="text"
                                    placeholder="e.g. Fonseca"
                                    required
                                    slotProps={{
                                        input: {
                                            minLength: 3,
                                            maxLength: 10,
                                            pattern: "[a-zA-Z ]*[a-zA-Z][a-zA-Z ]*",
                                        },
                                    }}
                                    value={lastName}
                                    onChange={handleLastName}
                                    sx={inputSx}
                                />
                            </FormControl>
                        </Box>

                        <FormControl
                            fullWidth
                            sx={{ display: "block", marginBottom: "1rem" }}
                        >
                            <FormLabel htmlFor="formBasicEmail" sx={labelSx}>
                                Email address
                            </FormLabel>
                            <OutlinedInput
                                id="formBasicEmail"
                                fullWidth
                                type="email"
                                placeholder="Enter email"
                                slotProps={{
                                    input: {
                                        pattern: "^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                                    },
                                }}
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={inputSx}
                            />
                            <Typography component="small" variant="inherit" sx={helperSx}>
                                We'll never share your email with anyone else.
                            </Typography>
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
                                placeholder="Password"
                                required
                                slotProps={{
                                    input: {
                                        minLength: 8,
                                        maxLength: 16,
                                    },
                                }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={inputSx}
                            />
                            <Typography component="small" variant="inherit" sx={helperSx}>
                                Your password must be 8~16 characters long.
                            </Typography>
                        </FormControl>

                        <Box sx={{ marginBottom: "1rem" }}>
                            <Box sx={checkboxRowSx}>
                                <FormControlLabel
                                    htmlFor="formBasicCheckbox"
                                    disableTypography
                                    label="Remember me"
                                    control={
                                        <Checkbox
                                            id="formBasicCheckbox"
                                            disableRipple
                                            icon={checkboxIcon}
                                            checkedIcon={checkedCheckboxIcon}
                                            sx={checkboxSx}
                                        />
                                    }
                                    sx={checkboxLabelSx}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ marginBottom: "1rem" }}>
                            <Box sx={checkboxRowSx}>
                                <FormControlLabel
                                    htmlFor="formBasicTermsCheckbox"
                                    disableTypography
                                    label="Agree to terms and conditions"
                                    control={
                                        <Checkbox
                                            id="formBasicTermsCheckbox"
                                            disableRipple
                                            icon={checkboxIcon}
                                            checkedIcon={checkedCheckboxIcon}
                                            sx={checkboxSx}
                                        />
                                    }
                                    sx={checkboxLabelSx}
                                />
                            </Box>
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
                            Create an account
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
                                Already have one?{" "}
                                <Box
                                    component={Link}
                                    to={"/auth/login"}
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
                                    Log in
                                </Box>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
