import React from "react";
import { Slider } from "antd";
import "../styles/Navbar.less";
import { Select } from "antd";
const { Option } = Select;

export default function Navbar(props) {
  // imported functions from Palette; change their states
  function handleSlider(value) {
    props.setLevel(value);
  }
  function handleSelect(value) {
    props.setType(value);
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
      <div className="select">
        <Select defaultValue="hex" onChange={handleSelect}>
          <Option value="hex">HEX - #FFFFFF</Option>
          <Option value="rgb">RGB - rgb(255,255,255)</Option>
          <Option value="rgba">RGBA - rgb(255,255,255, 1.0)</Option>
        </Select>
      </div>
    </header>
  );
}
