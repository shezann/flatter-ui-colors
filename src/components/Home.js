import React from "react";
import { Route, Link } from "react-router-dom";
import "../styles/Home.less";
import seedColors from "../helpers/seedColors";

export default function Home() {
  console.log(seedColors);

  return (
    <div className="Home">
      <h1>List of Palettes</h1>

      {seedColors.map((palette) => (
        <p>
          {" "}
          <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
        </p>
      ))}

      <Link to="/palette/material-ui-colors">Material UI Colors</Link>
    </div>
  );
}
