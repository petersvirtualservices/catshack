import React, { useState } from "react";
import {
  CardMedia,
  Grid,
  Card,
  CardActionArea,
  CardHeader,
  CircularProgress,
} from "@material-ui/core";

import PetsIcon from "@material-ui/icons/Pets";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.primary.main,
  },
  image: {
    height: 400,
    [theme.breakpoints.up("lg")]: {
      height: 250,
    },
  },
}));

const AnimalCard = (props) => {
  const { result } = props;
  const classes = useStyles();
  const [imageLoading, setImageLoading] = useState(true);
  let ImageComponent;

  if (result.photos && result.photos[0] && result.photos[0].full) {
    ImageComponent = () => (
      <div
        className={classes.image}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "rgb(200,200,200)",
        }}
      >
        (
        <CardMedia
          component="img"
          className={classes.image}
          image={result.photos[0].full}
          onLoad={() => setImageLoading(false)}
          style={imageLoading ? { display: "none" } : {}}
        />
        ){imageLoading && <CircularProgress />}
      </div>
    );
  } else {
    ImageComponent = () => (
      <div
        className={classes.image}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "rgb(200,200,200)",
        }}
      >
        <PetsIcon fontSize={"large"} />
        <span>No Photo Found</span>
      </div>
    );
  }

  return (
    <Grid item xs={6} lg={3} style={{ padding: 5 }}>
      <a style={{ textDecoration: "none" }} href={result.url}>
        <Card className={classes.card}>
          <CardActionArea>
            <ImageComponent />
            <CardHeader
              title={result.name}
              titleTypographyProps={{
                style: {
                  margin: "auto",
                  textAlign: "center",
                  textDecoration: "none",
                },
                color: "textPrimary",
                variant: "h6",
              }}
            />
          </CardActionArea>
        </Card>
      </a>
    </Grid>
  );
};
export default AnimalCard;
