import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "../styles/Palette.less";
import Navbar from "./Navbar";

export default function Palette(props) {
  //create states
  const [level, setLevel] = useState(300);
  const [type, setType] = useState("hex");

  //import ColorBoxes
  const colorBoxes = props.palette.colors[level].map((color) => {
    return (
      <ColorBox
        background={color[type]}
        name={color.name}
        key={color.id}
        paletteId={props.palette.id}
        colorId={color.id}
        showLink={true}
      />
    );
  });

  return (
    <div className="palette">
      <Navbar level={level} setLevel={setLevel} setType={setType} />
      <div className="palette-colors"> {colorBoxes} </div>
      <footer className="palette-footer">
        {props.palette.paletteName}
        <span className="emoji">{props.palette.emoji}</span>
      </footer>
    </div>
  );
}
