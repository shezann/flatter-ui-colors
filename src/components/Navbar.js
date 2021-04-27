import React from "react";
import { Link } from "react-router-dom";
import { Slider } from "antd";
import "../styles/Navbar.less";
import { Select, message } from "antd";
const { Option } = Select;

export default function Navbar(props) {
  // imported functions from Palette; change their states
  function handleSlider(value) {
    props.setLevel(value);
  }

  function handleSelect(value) {
    props.setType(value);
    message.success(`Changed to ${value}`, 1);
  }

  return (
    <header className="navbar">
      <div className="name">
        <Link to="/">reactcolorpicker</Link>
      </div>

      {props.showSlider && (
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
      )}

      <div className="select">
        <Select defaultValue="hex" onChange={handleSelect}>
          <Option value="hex">HEX - #AA1923</Option>
          <Option value="rgb">RGB - (1,2,3)</Option>
          <Option value="rgba">RGBA - (1,2,3, 0.4)</Option>
        </Select>
      </div>
    </header>
  );
}
