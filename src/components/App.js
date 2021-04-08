import React from "react";
import Palette from "./Palette";
import seedColors from "../helpers/seedColors";
import { makePalette } from "../helpers/colorHelpers";
// check
import "../styles/App.less";

function App() {
  console.log(makePalette(seedColors[4]));

  return (
    <div className="App">
      <Palette palette={makePalette(seedColors[4])} />
    </div>
  );
}

export default App;
