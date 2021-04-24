import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "../styles/NewPalette.less";
import { ChromePicker } from "react-color";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import DraggableColorBox from "./DraggableColorBox";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import { Link } from "react-router-dom";
import NewPaletteNavbar from "./NewPaletteNavbar";
import ColorPicker from "./ColorPicker";

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

  function deleteColor(hex) {
    const filteredPalette = palette.filter((color) => color.color !== hex);
    setPalette(filteredPalette);
  }

  function onSortEnd({ oldIndex, newIndex }) {
    setPalette(arrayMove(palette, oldIndex, newIndex));
  }

  return (
    <div className="root">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsedWidth={0}
          collapsed={collapsed}
          className="sidebar"
          width={350}
        >
          <ColorPicker
            palette={palette}
            palettes={props.palettes}
            setColorName={setColorName}
            setButtonColor={setButtonColor}
            colorName={colorName}
            setCurrentColor={setCurrentColor}
            setPalette={setPalette}
            buttonColor={buttonColor}
          />
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
