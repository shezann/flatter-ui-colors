import React, { useState } from "react";
import { Layout } from "antd";
import "../styles/NewPalette.less";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import NewPaletteNavbar from "./NewPaletteNavbar";
import ColorPicker from "./ColorPicker";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import seedColors from "../helpers/seedColors";

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
  const [palette, setPalette] = useState(seedColors[0].colors);
  const [newPaletteName, setNewPaletteName] = useState("");

  function deleteColor(hex) {
    const filteredPalette = palette.filter((color) => color.color !== hex);
    setPalette(filteredPalette);
  }

  function onSortEnd({ oldIndex, newIndex }) {
    setPalette(arrayMove(palette, oldIndex, newIndex));
  }

  function collapseSidebar() {
    collapsed ? setCollapsed(false) : setCollapsed(true);
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
          {!collapsed && (
            <div className="s-toggle">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: collapseSidebar,
                }
              )}
            </div>
          )}

          <ColorPicker
            palette={palette}
            palettes={props.palettes}
            setColorName={setColorName}
            setButtonColor={setButtonColor}
            colorName={colorName}
            currentColor={currentColor}
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
