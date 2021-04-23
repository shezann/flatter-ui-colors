import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "../styles/ColorPicker.less";
import { ChromePicker } from "react-color";

export default function ColorPicker(props) {
  const {
    palette,
    setColorName,
    setButtonColor,
    colorName,
    setCurrentColor,
    setPalette,
    buttonColor,
  } = props;

  function hitMax() {
    return palette.length >= 20;
  }

  useEffect(() => {
    ValidatorForm.addValidationRule("isNameUnique", (value) =>
      palette.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
  }, [palette]);

  function handleColorChange(newColor) {
    const { h, s, l, a } = newColor.hsl;
    setCurrentColor(newColor.hex);
    setButtonColor({
      hex: `${newColor.hex}`,
      h: h,
      s: `${s * 100}%`,
      l: `${l * 100}%`,
      a: a,
    });
  }

  function getRandomColor() {
    //pick random color from all previous colors
    const allColors = props.palettes.map((p) => p.colors).flat();
    let random = Math.floor(Math.random() * allColors.length);
    setPalette([...palette, allColors[random]]);
  }

  function addColor() {
    setColorName("");
    setPalette([
      ...palette,
      {
        color: buttonColor.hex,
        name: colorName,
      },
    ]);
  }

  function handleInput(event) {
    setColorName(event.target.value);
  }

  function clearPalette() {
    setPalette([]);
  }

  let addButtonStyle = {
    background: `linear-gradient(141deg, hsla(${buttonColor.h},${buttonColor.s},${buttonColor.l}, ${buttonColor.a}) 0%, hsla(${buttonColor.h},${buttonColor.s}, 80%, 1) 93%)`,
  };

  return (
    <div className="sidebar-content">
      <h1>Design Your Palette</h1>
      <div className="side-buttons">
        <Button onClick={clearPalette} type="primary" danger>
          CLEAR PALETTE
        </Button>
        <Button
          onClick={getRandomColor}
          type="primary"
          disabled={hitMax() && true}
        >
          RANDOM COLOUR
        </Button>
      </div>
      <ChromePicker
        className="chrome-picker-but"
        style={{ width: "300px" }}
        color={`hsla(${buttonColor.h},${buttonColor.s},${buttonColor.l}, 1)`}
        onChange={(newColor) => handleColorChange(newColor)}
      />

      <ValidatorForm className="input-btn" onSubmit={addColor}>
        <TextValidator
          value={colorName}
          label="Color Name"
          onChange={handleInput}
          validators={["required", "isNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a colour name",
            "Name is already used",
            "Color already used",
          ]}
        />

        <button
          className="add-button"
          type="submit"
          style={hitMax() ? { background: "grey" } : addButtonStyle}
          disabled={hitMax() && true}
        >
          {hitMax() ? "PALETTE FULL" : "ADD COLOUR"}
        </button>
      </ValidatorForm>
    </div>
  );
}
