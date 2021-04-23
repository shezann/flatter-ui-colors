import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

const DraggableColorList = SortableContainer(({ palette, deleteColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {palette.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          color={color}
          handleClick={() => deleteColor(color.color)}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
