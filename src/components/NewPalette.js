import React, { useState } from "react";
import { Layout, Button } from "antd";
import "../styles/NewPalette.less";
import { ChromePicker } from "react-color";
import { hex } from "chroma-js";

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

  return (
    <div>
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
              className="chrome-picker"
              color={`hsla(${buttonColor.h},${buttonColor.s},${buttonColor.l}, 1)`}
              onChange={(newColor) => handleColorChange(newColor)}
            />

            <button
              className="add-button"
              style={{
                background: `linear-gradient(141deg, hsla(${buttonColor.h},${buttonColor.s},${buttonColor.l}, ${buttonColor.a}) 0%, hsla(${buttonColor.h},${buttonColor.s}, 80%, 1) 93%)`,
              }}
              onClick={addColor}
            >
              ADD COLOUR
            </button>
          </div>
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Button type="primary" shape="circle" onClick={collapseSidebar}>
              >
            </Button>
            <Button type="primary">Primary Button</Button>
            <Button type="primary" danger>
              Primary Button
            </Button>
          </Header>
          <h1>Palette's here</h1>
          {/* FIXME: finish making palette */}
          <ul>
            {palette.map((color) => (
              <li style={{ backgroundColor: `${color}` }}>{color}</li>
            ))}
          </ul>
        </Layout>
      </Layout>
    </div>
  );
}

export default NewPalette;
