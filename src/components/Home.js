import React from "react";
import { Route, Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    backgroundColor: "blue",
    display: "flex",
    height: "100vh",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    "& h1": {
      color: "white",
    },
    "& a": {
      color: "white",
    },
    "& a:hover": {
      textDecoration: "underline",
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
  },
};

function Home(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Flat Colors</h1>
          <Link to="/palette/new">Create New Palette</Link>
        </nav>

        <div className={classes.palettes}>
          {props.palettes.map((palette) => (
            <Route
              render={(routeProps) => (
                <MiniPalette {...palette} {...routeProps} />
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Home);
