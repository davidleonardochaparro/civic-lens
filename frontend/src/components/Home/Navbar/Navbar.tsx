import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { indigo } from "@mui/material/colors";
import SatelliteAltIcon from "@mui/icons-material/SatelliteAlt";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const indigoFifty = indigo[50];
const indigoNineHundred = indigo[900];

export default function Navbar() {
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
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: indigoFifty,
                                    color: indigoNineHundred,
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
                                variant="contained"
                                sx={{
                                    backgroundColor: indigoFifty,
                                    color: indigoNineHundred,
                                    textTransform: "none",
                                    fontSize: { xs: "0.7rem", sm: ".875rem"},
                                    px: { xs: 1, sm: 2},
                                    py: { xs: 0.5, sm: .75},
                                    whiteSpace: "nowrap"
                                }}
                            >
                                Log-in
                            </Button>
                        </Stack>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
