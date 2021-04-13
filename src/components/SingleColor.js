import React, { useState } from "react";
import ColorBox from "./ColorBox";
import "../styles/Palette.less";
import "../styles/ColorBox.less";
import Navbar from "./Navbar";
import { message } from "antd";
import { Link } from "react-router-dom";

export default function SingleColor(props) {
  const [type, setType] = useState("hex");

  function handleSelect(value) {
    props.setType(value);
    message.success(`Changed to ${value}`, 1);
  }

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
        background={color[type]}
        showLink={false}
        singleColor="single-color"
      />
    );
  });

  return (
    <div className="palette">
      <Navbar showSlider={false} setType={setType} />
      <div className="palette-colors">
        {colorBoxes}
        <div className="go-back ColorBox">
          <Link to={`/palette/${props.palette.id}`} className="back-button">
            BACK
          </Link>
        </div>
      </div>
      <footer className="palette-footer">
        {props.palette.paletteName}
        <span className="emoji">{props.palette.emoji}</span>
      </footer>
    </div>
  );
}
