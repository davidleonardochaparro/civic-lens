import { indigo } from "@mui/material/colors";
import { Link } from "react-router";
import { useState } from "react";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Navbar() {

    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{ justifyContent: "space-between"}} disableGutters>
                        <Stack direction="row"
                            sx={{ alignItems: "center" }}
                        >

                            {/* For md screens */}
                            <SatelliteAltIcon
                                sx={{ display: { xs: "none", md: "flex" }, ml: 2, mr: 1 }}
                            />
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href="#app-bar"
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

                            {/* For xs screens */}
                            <SatelliteAltIcon
                                sx={{ display: { xs: "flex", md: "none" }, ml: 1, mr: 1 }}
                            />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: "flex", md: "none" },
                                    flexGrow: 1,
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".18rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                civic-lens
                            </Typography>
                        </Stack>

                        {/* Auth buttons */}
                        <Stack
                            direction="row"
                            spacing={{ xs: 1, sm: 2 }}
                            sx={{ 
                                mr: { xs: 0.8, sm: 2 },
                            }}
                        >
                            {!token && (
                                <>
                                    <Button
                                        component={Link}
                                        to="/auth/register"
                                        variant="contained"
                                        sx={{
                                            backgroundColor: indigo[50],
                                            color: indigo[900],
                                            textTransform: "none",
                                            fontSize: { xs: "0.7rem", sm: ".875rem"},
                                            px: { xs: 1, sm: 2},
                                            py: { xs: 0.5, sm: .75},
                                            whiteSpace: "nowrap"
                                        }}
                                    >                                
                                        Sign-up
                                    </Button>
                                    <Button
                                        component={Link}
                                        to="/auth/login"
                                        variant="contained"
                                        sx={{
                                            backgroundColor: indigo[50],
                                            color: indigo[900],
                                            textTransform: "none",
                                            fontSize: { xs: "0.7rem", sm: ".875rem"},
                                            px: { xs: 1, sm: 2},
                                            py: { xs: 0.5, sm: .75},
                                            whiteSpace: "nowrap"
                                        }}
                                    >
                                        Log-in
                                    </Button>                                
                                </>
                            )}
                            {
                                token && (
                                    <>
                                        <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleMenu}
                                            color="inherit"
                                        >
                                            <AccountCircle />
                                        </IconButton>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleClose}>My account</MenuItem>

                                        </Menu>
                                    </>
                                )
                            }
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
