import React, { useState } from "react";
import { Layout, Button, Input } from "antd";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import "../styles/NewPalette.less";
import { ChromePicker } from "react-color";
import { hex } from "chroma-js";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import DraggableColorBox from "./DraggableColorBox";

const { Header, Sider } = Layout;

function NewPalette() {
  // useStates
  const [collapsed, setCollapsed] = useState(false);
  const [buttonColor, setButtonColor] = useState({
    hex: "#f29eff",
    h: 292,
    s: "100%",
    l: "81%",
    a: 1,
  });
  const [palette, setPalette] = useState([]);
  const [colorName, setColorName] = useState("");

  function handleColorChange(newColor) {
    const { h, s, l, a } = newColor.hsl;
    setButtonColor({
      hex: `${newColor.hex}`,
      h: h,
      s: `${s * 100}%`,
      l: `${l * 100}%`,
      a: a,
    });
  }

  function collapseSidebar() {
    collapsed ? setCollapsed(false) : setCollapsed(true);
  }

  function addColor() {
    setPalette((prevArray) => [...prevArray, buttonColor.hex]);
    
  }

  function handleInput(event) {
    setColorName(event.target.value);
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
          width={400}
        >
          <div className="sidebar-content">
            <h1>Design Your Palette</h1>
            <div className="side-buttons">
              <Button type="primary" danger>
                CLEAR PALETTE
              </Button>
              <Button type="primary">RANDOM COLOUR</Button>
            </div>
            <ChromePicker
              className="chrome-picker-but"
              style={{ width: "300px" }}
              color={`hsla(${buttonColor.h},${buttonColor.s},${buttonColor.l}, 1)`}
              onChange={(newColor) => handleColorChange(newColor)}
            />
            <Input
              className="input-btn"
              size="large"
              placeholder="Color Name"
            />

            <ValidatorForm onSubmit={addColor}>
              <TextValidator value={colorName} onChange={handleInput} />

              <button
                className="add-button"
                type="submit"
                style={{
                  background: `linear-gradient(141deg, hsla(${buttonColor.h},${buttonColor.s},${buttonColor.l}, ${buttonColor.a}) 0%, hsla(${buttonColor.h},${buttonColor.s}, 80%, 1) 93%)`,
                }}
                onClick={addColor}
              >
                ADD COLOUR
              </button>
            </ValidatorForm>
          </div>
        </Sider>

        <Layout className="site-layout">
          <Header
            className="site-layout-background header"
            style={{ padding: 0 }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: collapseSidebar,
              }
            )}
            <div>
              <Button type="primary header-btn">Primary Button</Button>
              <Button type="primary header-btn" danger>
                Primary Button
              </Button>
            </div>
          </Header>

          {/* MAIN CONTENT                */}
          <div className="main-content">
            {palette.map((color) => (
              <DraggableColorBox color={color} />
            ))}
          </div>
          {/* MAIN CONTENT */}
        </Layout>
      </Layout>
    </div>
  );
}

export default NewPalette;
