import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "../helpers/seedColors";
import { makePalette } from "../helpers/colorHelpers";
import Home from "./Home";
import "../styles/App.less";
import SingleColor from "./SingleColor";
import NewPalette from "./NewPalette";

function App() {
  const [palettes, setPalettes] = useState(seedColors);

  function findPalette(id) {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  function savePalette(newPalette) {
    console.log(
      "🚀 ~ file: App.js ~ line 19 ~ savePalette ~ newPalette",
      newPalette
    );
    setPalettes([...palettes, newPalette]);
  }

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={(routeProps) => (
          <NewPalette savePalette={savePalette} {...routeProps} />
        )}
      />

      <Route exact path="/" render={() => <Home palettes={palettes} />} />

      <Route
        exact
        path="/palette/:id"
        render={(routeProps) => (
          <Palette
            palette={makePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />

      <Route
        path="/palette/:paletteId/:colorId"
        render={(routeProps) => (
          <SingleColor
            palette={makePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
            colorId={routeProps.match.params.colorId}
          />
        )}
      />
    </Switch>
  );
}

export default App;
