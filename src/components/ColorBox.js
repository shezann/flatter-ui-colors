import React, { useState } from "react";
import "../styles/ColorBox.less";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";

export default function ColorBox(props) {
  const { name, background, paletteId, colorId } = props;
  const [show, setshow] = useState("");

  function handleCopy() {
    setshow("show");
    setTimeout(() => setshow(""), 800);
  }

  const isDark = chroma(background).luminance() <= 0.08;
  const isLight = chroma(background).luminance() >= 0.6;

  return (
    <CopyToClipboard text={background} onCopy={handleCopy}>
      <div
        style={{ background: background }}
        className={`ColorBox ${props.singleColor}`}
      >
        <div
          style={{ background: background }}
          className={`copy-overlay ${show}`}
        />

        <div className={`copy-message ${show}`}>
          <h1 className={isDark && "light-text"}>COPIED!</h1>
          <p className={isLight && "dark-text"}>{background}</p>
        </div>

        <div className="copy-container">
          <div className="box-content">
            <span className={isDark && "light-text"}>{name}</span>
          </div>
          <button className={`copy-button ${isLight && "dark-text"}`}>
            Copy
          </button>
        </div>
        {props.showLink && (
          <Link
            to={`/palette/${paletteId}/${colorId}`}
            onClick={(event) => event.stopPropagation()}
          >
            <span className={`see-more ${isLight && "dark-text"}`}>More</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}
