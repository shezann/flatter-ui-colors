import React, { useEffect } from "react";
import { Button } from "antd";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "../styles/NewPaletteNavbar.less";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function NewPaletteNavbar(props) {
  const {
    palette,
    palettes,
    newPaletteName,
    setNewPaletteName,
    currentColor,
    collapsed,
    setCollapsed,
    history,
    savePalette,
  } = props;

  function collapseSidebar() {
    collapsed ? setCollapsed(false) : setCollapsed(true);
  }

  function handlePaletteNameInput(event) {
    setNewPaletteName(event.target.value);
  }

  function addPalette() {
    let newName = newPaletteName;

    const newPalette = {
      id: newName.toLowerCase().replace(/ /g, "-"),
      paletteName: newName,
      colors: palette,
    };
    savePalette(newPalette);

    history.push(`/`);
  }

  useEffect(() => {
    ValidatorForm.addValidationRule("isNameUnique", (value) =>
      palette.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      palette.every(({ color }) => color !== currentColor)
    );
    ValidatorForm.addValidationRule("isPaletteUnique", (value) =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [currentColor, palette, palettes]);

  return (
    <div class="header">
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: collapseSidebar,
      })}

      <ValidatorForm className="palette-name-input" onSubmit={addPalette}>
        <TextValidator
          value={newPaletteName}
          label="Palette Name"
          onChange={handlePaletteNameInput}
          validators={["required", "isPaletteUnique"]}
          errorMessages={[
            "Enter a palette name",
            "Palette name is already used",
          ]}
        />
        <Link to="/">
          <Button danger type="primary header-btn" htmlType="submit">
            GO BACK
          </Button>
        </Link>

        <Button type="primary header-btn" htmlType="submit">
          SAVE PALETTE
        </Button>
      </ValidatorForm>
    </div>
  );
}
