import React from "react";
import { Button } from "antd";
import "../styles/NewPaletteNavbar.less";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SavePaletteForm from "./SavePaletteForm";

export default function NewPaletteNavbar(props) {
  const {
    palette,
    palettes,
    newPaletteName,
    setNewPaletteName,
    collapsed,
    setCollapsed,
    history,
    savePalette,
  } = props;

  function collapseSidebar() {
    collapsed ? setCollapsed(false) : setCollapsed(true);
  }

  return (
    <div class="header">
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: collapseSidebar,
      })}

      <div className="palette-name-input">
        <Link to="/">
          <Button danger type="primary header-btn" htmlType="submit">
            GO BACK
          </Button>
        </Link>

        <SavePaletteForm
          newPaletteName={newPaletteName}
          palette={palette}
          savePalette={savePalette}
          history={history}
          setNewPaletteName={setNewPaletteName}
          palettes={palettes}
        />
      </div>
    </div>
  );
}
