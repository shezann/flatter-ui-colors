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
    //for small screens
    [`@media (max-width: 575.98px )`]: {
      display: "inline-block",
    },
    "& h1": {
      color: "white",
      fontSize: "28px",
      fontWeight: "800",
      letterSpacing: "2.5px",
      textTransform: "uppercase",
      marginTop: "15px",
      marginBottom: "15px",
      //for small screens
      [`@media (max-width: 575.98px )`]: {
        marginBottom: "30px",
        textAlign: "center",
      },
    },
    "& a": {
      color: "white",
      fontSize: "17px",
      fontWeight: "600",
      transition: "0.5s ease all .3s",
      [`@media (max-width: 575.98px )`]: {
        position: "absolute",
        top: "55px",
        left: "30%",
        textDecoration: "underline",
      },
      "&:before": {
        background: "#fff",
        content: `""`,
        position: "absolute",
        height: "2px",
        width: "0",
        top: "47px",
      },
    },
    "& a:hover:before": {
      width: "144px",
      transition: "0.3s ease all",
    },
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "2.5rem",
    [`@media (max-width: 991.98px )`]: {
      gridTemplateColumns: "repeat(2,50%)",
      gridGap: "1.5rem",
    },
    [`@media (max-width: 575.98px )`]: {
      gridTemplateColumns: "repeat(1,100%)",
      gridGap: "1rem",
    },
  },
  [`@media (max-width:1500.98px )`]: {
    container: { width: "80%" },
  },
  [`@media (max-width:991.98px )`]: {
    container: { width: "80%" },
  },
};

function Home(props) {
  const { classes, palettes, setPalettes } = props;

  //TODO: do filtering delete
  function deletePalette(id) {
    console.log(palettes);
    const filteredPalettes = palettes.filter((palette) => palette.id !== id);
    setPalettes(filteredPalettes);
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>Flatter UI Colors</h1>
          <Link to="/palette/new">Create New Palette</Link>
        </nav>

        <div className={classes.palettes}>
          {props.palettes.map((palette) => (
            <Route
              render={(routeProps) => (
                <MiniPalette
                  {...palette}
                  {...routeProps}
                  deletePalette={deletePalette}
                />
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Home);
