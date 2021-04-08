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
    return <ColorBox background={color[type]} name={color.name} />;
  });

  return (
    <div className="Palette">
      <Navbar level={level} setLevel={setLevel} setType={setType} />
      <div className="Palette-colors"> {colorBoxes} </div>
      {/* {footer} */}
    </div>
  );
}
