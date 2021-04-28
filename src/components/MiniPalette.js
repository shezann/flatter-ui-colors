import React from "react";
import { withStyles } from "@material-ui/styles";
import { DeleteFilled } from "@ant-design/icons";
import { Popconfirm } from "antd";

const styles = {
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    position: "relative",
    padding: "0.5rem",
    overflow: "hidden",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover span": {
      opacity: "1",
    },
  },
  colors: {
    backgroundColor: "#dae1e4",
    height: "150px",
    width: "100%",
    borderRadius: "5px",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.3rem",
    fontSize: "1rem",
    position: "relative",
    fontFamily: "Barlow",
    fontWeight: "600",
    letterSpacing: "0.55px",
    "& span": {
      marginLeft: "0.5rem",
    },
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-6px",
    "&:nth-child(1)": {
      borderTopLeftRadius: "5px",
    },
    "&:nth-child(5)": {
      borderTopRightRadius: "5px",
    },
    "&:nth-child(16)": {
      borderBottomLeftRadius: "5px",
    },
    "&:nth-child(20)": {
      borderBottomRightRadius: "5px",
    },
  },
  delete: {
    transition: "all 0.2s ease-in-out",
    fontSize: "20px",
    margin: "5px",
    borderRadius: "5px",
    position: "absolute",
    opacity: "0",
    paddingTop: "3px",
    backgroundColor: "red",
    top: "0px",
    right: "0px",
    width: "14%",
    height: "14%",
    zIndex: "10",
    color: "white",
  },
};

function MiniPalette(props) {
  //extract from props
  const { classes, id, paletteName, emoji, colors } = props;
  //create the mini palletes
  const miniPalettes = colors.map((color) => {
    return (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    );
  });

  function handleClick() {
    props.history.push(`/palette/${id}`);
  }

  function handleDelete() {
    props.deletePalette(id);
  }

  function confirm(e) {
    e.stopPropagation();
    handleDelete();
  }

  function cancel(e) {
    e.stopPropagation();
  }

  return (
    <div className={classes.root} onClick={handleClick}>
      <Popconfirm
        title="Delete this Palette?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <div onClick={(e) => e.stopPropagation()}>
          <DeleteFilled className={classes.delete} />
        </div>
      </Popconfirm>

      <div className={classes.colors}>{miniPalettes}</div>
      <h5 className={classes.title}>
        {paletteName} <span>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
