import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

export default function DraggableColorList({ palette, deleteColor }) {
  return (
    <div style={{ height: "100%" }}>
      {palette.map((color) => (
        <DraggableColorBox
          key={color.name}
          color={color}
          handleClick={() => deleteColor(color.color)}
        />
      ))}
    </div>
  );
}
