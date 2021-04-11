import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    position: "relative",
    padding: "0.5rem",
    overflow: "hidden",
    borderRadius: "5px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  colors: {
    //backgroundColor: "grey",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
    "& span": {
      marginLeft: "0.5rem",
      fontSize: "1.5rem",
    },
  },
};

function MiniPalette(props) {
  //extract from props
  const { classes, paletteName, emoji } = props;

  return (
    <div className={classes.root}>
      <div className={classes.colors}>
        <h5 className={classes.title}>
          {paletteName} <span>{emoji}</span>
        </h5>
      </div>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
