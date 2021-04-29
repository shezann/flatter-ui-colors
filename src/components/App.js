import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "../helpers/seedColors";
import { makePalette } from "../helpers/colorHelpers";
import Home from "./Home";
import "../styles/App.less";
import SingleColor from "./SingleColor";
import NewPalette from "./NewPalette";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../styles/global.less";

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  function findPalette(id) {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  }

  function savePalette(newPalette) {
    setPalettes([...palettes, newPalette]);
  }

  useEffect(() => {
    syncLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palettes]);

  function syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }

  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={500} classNames="item">
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={(routeProps) => (
                  <NewPalette
                    savePalette={savePalette}
                    {...routeProps}
                    palettes={palettes}
                  />
                )}
              />

              <Route
                exact
                path="/"
                render={() => (
                  <Home palettes={palettes} setPalettes={setPalettes} />
                )}
              />

              <Route
                exact
                path="/palette/:id"
                render={(routeProps) => (
                  <Palette
                    palette={makePalette(
                      findPalette(routeProps.match.params.id)
                    )}
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

              <Route
                render={() => (
                  <Home palettes={palettes} setPalettes={setPalettes} />
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
}

export default App;
