import React, { useEffect } from "react";
import { Button } from "antd";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "../styles/ColorPicker.less";
import { ChromePicker } from "react-color";

export default function ColorPicker(props) {
  const {
    palette,
    palettes,
    setColorName,
    setButtonColor,
    colorName,
    currentColor,
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
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      palette.every(({ color }) => color !== currentColor)
    );
  }, [currentColor, palette]);

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
    const allColors = palettes.map((p) => p.colors).flat();
    let random = Math.floor(Math.random() * allColors.length);
    let randomColor = allColors[random];
    while (palette.indexOf(randomColor) !== -1) {
      random = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[random];
    }
    setPalette([...palette, randomColor]);
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
      <h1>Pick your colour</h1>
      <div className="side-buttons">
        <Button
          className="side-button1"
          onClick={clearPalette}
          type="primary"
          danger
        >
          CLEAR ALL
        </Button>
        <Button
          className="side-button2"
          onClick={getRandomColor}
          type="primary"
          disabled={hitMax() && true}
        >
          RANDOM COLOR
        </Button>
      </div>
      <ChromePicker
        className="chrome-picker-but"
        style={{ width: "300px" }}
        color={`hsla(${buttonColor.h},${buttonColor.s},${buttonColor.l}, 1)`}
        onChange={(newColor) => handleColorChange(newColor)}
      />

      <ValidatorForm onSubmit={addColor} instantValidate={false}>
        <TextValidator
          value={colorName}
          label="Color Name"
          onChange={handleInput}
          className="input"
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
