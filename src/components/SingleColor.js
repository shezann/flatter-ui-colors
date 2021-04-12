import React from "react";
import ColorBox from "./ColorBox";
import "../styles/Palette.less";

export default function SingleColor(props) {
  //get the shades of the one color that is in the link
  // LOGIC copied from Colt Steele TODO: add github link

  const _shades = createShades(props.palette, props.colorId);

  function createShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  }

  const colorBoxes = _shades.map((color) => {
    return (
      <ColorBox
        key={color.id}
        name={color.name}
        background={color.hex}
        showLink={false}
      />
    );
  });

  return (
    <div className="palette">
      <h1>{props.colorId}</h1>
      <div className="palette-colors">{colorBoxes}</div>
    </div>
  );
}
