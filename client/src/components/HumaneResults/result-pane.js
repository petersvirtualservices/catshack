import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Grid } from "@material-ui/core";
import AnimalCard from "./animal-card";
const ResultPane = (props) => {
  if (props.loading) {
    return <LinearProgress style={{ width: "100%", height: 5 }} />;
  }

  return (
    <Grid
      style={{ width: "100%" }}
      container
      justify="center"
      alignItems="center"
    >
      {props.results.map((result) => (
        <AnimalCard key={result.id} result={result} />
      ))}
    </Grid>
  );
};

export default ResultPane;
