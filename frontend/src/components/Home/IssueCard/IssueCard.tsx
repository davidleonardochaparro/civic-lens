import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Stack from "@mui/material/Stack";
import streetlight from "./assets/streetlight.jpg";
import Chip from "@mui/material/Chip";

export default function IssueCard() {
    /*
        * Center the card
            * Create a parent to hold the card probably a stack 
        * Probably display the info of all the cards with a map()
    */

    return (

        <Stack sx={{ 
            alignItems: "center",  
            mt: "2rem"
            }}>

            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Title of the encountered issue"
                    subheader={
                        <>
                            Created: September 14, 2016
                        </>
                    }
                />
                <CardMedia
                    component="img"
                    height="194"
                    // image="/static/images/cards/paella.jpg"
                    image={streetlight}
                    alt="Broken streetlight"
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Here will be the description of the issue.
                        <br></br>
                        For example: "Broken streetlight encounter on Bowery Street."
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexGrow: 1
                        }}    
                    >
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                mr: 1
                            }}
                        >
                            <Chip color="error" size="small" label="Category"/>
                            <Chip color="warning" size="small" label="Status"/>
                        </Stack>
                    </Stack>
                </CardActions>
                
            </Card>

        </Stack>

    );
}
