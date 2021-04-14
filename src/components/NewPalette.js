import React, { useState } from "react";
import { Layout, Button } from "antd";
import "../styles/NewPalette.less";
import { ChromePicker } from "react-color";

const { Header, Sider } = Layout;

function NewPalette() {
  const [collapsed, setCollapsed] = useState(false);

  function handleClick() {
    collapsed ? setCollapsed(false) : setCollapsed(true);
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
          <div class="sidebar-content">
            <h1>Design Your Palette</h1>
            <div className="side-buttons">
              <Button type="primary" danger>
                CLEAR PALETTE
              </Button>
              <Button type="primary">RANDOM COLOUR</Button>
            </div>

            <ChromePicker
              className="chrome-picker"
              color="purple"
              onChangeComplete={(newColor) => console.log(newColor)}
            />

            <Button className="add-button" type="primary">
              ADD COLOUR
            </Button>
          </div>
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Button type="primary" shape="circle" onClick={handleClick}>
              >
            </Button>
            <Button type="primary">Primary Button</Button>
            <Button type="primary" danger>
              Primary Button
            </Button>
          </Header>
          <h1>Palette's here</h1>
        </Layout>
      </Layout>
    </div>
  );
}

export default NewPalette;
