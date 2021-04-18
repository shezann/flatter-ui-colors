import React from "react";
import "../styles/DraggableColorBox.less";
import { DeleteFilled } from "@ant-design/icons";

export default function DraggableColorBox(props) {
  const { color } = props;

  return (
    <div className="main" style={{ backgroundColor: color.color }}>
      <div className="content">
        <span>{color.name}</span>
        <span>
          <DeleteFilled className="delete-icon" onClick={props.handleClick} />
        </span>
      </div>
    </div>
  );
}
