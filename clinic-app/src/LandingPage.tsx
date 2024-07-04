import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";

export function LandingPage(){
    return (
        <Grid sx={{justifyContent:"center"}}>
        <Card sx={{ maxWidth: 345 ,justifyContent:"center"}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image= "image/landingpage.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Grid>
    )
}