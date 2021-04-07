import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "../styles/Palette.less";
import { Slider, Switch } from "antd";
//import "antd/dist/antd.css";

export default function Palette(props) {
  //set level
  const [level, setLevel] = useState(props.level);
  function handleSlider(value) {
    setLevel(value);
  }

  //import ColorBoxes
  const colorBoxes = props.palette.colors[level].map((color) => {
    return <ColorBox background={color.hex} name={color.name} />;
  });

  return (
    <div className="Palette">
      <div className="slider">
        <Slider
          defaultValue={props.level}
          step={100}
          max={900}
          min={100}
          onChange={handleSlider}
        />
      </div>

      {/* {Navbar goes here} */}
      <div className="Palette-colors"> {colorBoxes} </div>
      {/* {footer} */}
    </div>
  );
}
