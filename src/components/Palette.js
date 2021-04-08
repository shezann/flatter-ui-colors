import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "../styles/Palette.less";
import Navbar from "./Navbar";

export default function Palette(props) {
  //set level
  const [level, setLevel] = useState(props.level);


  //import ColorBoxes
  const colorBoxes = props.palette.colors[level].map((color) => {
    return <ColorBox background={color.hex} name={color.name} />;
  });

  return (
    <div className="Palette">
      <Navbar level={level} setLevel={setLevel} />
      <div className="Palette-colors"> {colorBoxes} </div>
      {/* {footer} */}
    </div>
  );
}
