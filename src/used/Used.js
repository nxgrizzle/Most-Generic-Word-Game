import React from "react";
import "./used.css";

export default function Used(props) {
  return (
    <div
      className={`words-container used ${
        props.width < 800 && props.menu ? "opened" : ""
      }`}
      style={{ position: "relative" }}
    >
      {props.width < 800 && (
        <div className="symbol" onClick={props.toggleMenu}>
          {props.menu ? "ᐃ" : "ᐁ"}
        </div>
      )}
      <ul className="used-words">
        {props.usedWords.map((word) => {
          return (
            <li
              key={word}
              className="used-words-li"
              style={{ fontWeight: "bold" }}
            >
              {word.toLowerCase()}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
