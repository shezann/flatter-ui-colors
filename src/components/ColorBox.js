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
  const isLight = chroma(background).luminance() >= 0.8;

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
          <h1>COPIED!</h1>
          <p>{background}</p>
        </div>

        <div className="copy-container">
          <div className="box-content">
            <span>{name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        {props.showLink && (
          <Link
            to={`/palette/${paletteId}/${colorId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="see-more">More</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}
