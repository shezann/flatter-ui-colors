import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "../styles/NewPalette.less";
import { ChromePicker } from "react-color";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import NewPaletteNavbar from "./NewPaletteNavbar";

const { Header, Sider } = Layout;

function NewPalette(props) {
  // useStates
  const [collapsed, setCollapsed] = useState(false);
  const [buttonColor, setButtonColor] = useState({
    hex: "#f29eff",
    h: 292,
    s: "100%",
    l: "81%",
    a: 1,
  });
  const [colorName, setColorName] = useState("");
  const [currentColor, setCurrentColor] = useState("#F29EFF");
  const [palette, setPalette] = useState(props.palettes[0].colors);
  const [newPaletteName, setNewPaletteName] = useState("");

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

  function deleteColor(hex) {
    const filteredPalette = palette.filter((color) => color.color !== hex);
    setPalette(filteredPalette);
  }

  function onSortEnd({ oldIndex, newIndex }) {
    setPalette(arrayMove(palette, oldIndex, newIndex));
  }

  function clearPalette() {
    setPalette([]);
  }

  function getRandomColor() {
    //pick random color from all previous colors
    const allColors = props.palettes.map((p) => p.colors).flat();
    let random = Math.floor(Math.random() * allColors.length);
    setPalette([...palette, allColors[random]]);
  }

  function hitMax() {
    return palette.length >= 20;
  }

  let addButtonStyle = {
    background: `linear-gradient(141deg, hsla(${buttonColor.h},${buttonColor.s},${buttonColor.l}, ${buttonColor.a}) 0%, hsla(${buttonColor.h},${buttonColor.s}, 80%, 1) 93%)`,
  };

  return (
    <div className="root">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsedWidth={0}
          collapsed={collapsed}
          className="sidebar"
          width={400}
        >
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
        </Sider>

        <Layout className="site-layout">
          <Header
            className="site-layout-background header"
            style={{ padding: 0 }}
          >
            <NewPaletteNavbar
              palette={palette}
              newPaletteName={newPaletteName}
              setNewPaletteName={setNewPaletteName}
              currentColor={currentColor}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              palettes={props.palettes}
              history={props.history}
              savePalette={props.savePalette}
            />
          </Header>

          {/* MAIN CONTENT                */}
          <div className="main-content">
            <DraggableColorList
              palette={palette}
              deleteColor={deleteColor}
              axis="xy"
              onSortEnd={onSortEnd}
            />
          </div>
          {/* MAIN CONTENT */}
        </Layout>
      </Layout>
    </div>
  );
}

export default NewPalette;
