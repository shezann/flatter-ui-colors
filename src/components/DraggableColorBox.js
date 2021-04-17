import React from "react";
import "../styles/DraggableColorBox.less";

export default function DraggableColorBox(props) {
  const { color } = props;

  return (
    <div className="main" style={{ backgroundColor: color.color }}>
      {color.name}
    </div>
  );
}
