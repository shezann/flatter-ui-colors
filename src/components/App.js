import React from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "../helpers/seedColors";
import { makePalette } from "../helpers/colorHelpers";
import Home from "./Home";
// check
import "../styles/App.less";

function App() {
  function findPalette(id) {
    return seedColors.find(function (palette) {
      return palette.id === id;
    });
  }

  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route
        exact
        path="/palette/:id"
        render={(routeProps) => (
          <Palette
            palette={makePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
    </Switch>

    // <div className="App">
    //   <Palette palette={makePalette(seedColors[0])} />
    // </div>
  );
}

export default App;
