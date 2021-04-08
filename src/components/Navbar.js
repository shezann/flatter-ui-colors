import React from "react";
import { Slider } from "antd";
import "../styles/Navbar.less";

export default function Navbar(props) {
  function handleSlider(value) {
    props.setLevel(value);
  }

  return (
    <header className="navbar">
      <div className="name">
        <a href="#">reactcolorpicker</a>
      </div>
      <div className="slider-box">
        <span>Level: {props.level}</span>
        <div className="slider">
          <Slider
            defaultValue={props.level}
            step={100}
            max={900}
            min={100}
            onChange={handleSlider}
          />
        </div>
      </div>
    </header>
  );
}
