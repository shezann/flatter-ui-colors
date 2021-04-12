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
    backgroundColor: "#dae1e4",
    height: "150px",
    widh: "100%",
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
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-5.6px",
  },
};

function MiniPalette(props) {
  //extract from props
  const { classes, id, paletteName, emoji, colors } = props;
  //create the mini palletes
  const miniPalettes = colors.map((color) => {
    return (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    );
  });

  function handleClick() {
    console.log(`clicked ${id}`);
    props.history.push(`/palette/${id}`);
  }

  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.colors}>{miniPalettes}</div>
      <h5 className={classes.title}>
        {paletteName} <span>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
