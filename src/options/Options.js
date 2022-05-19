import React from "react";
import "./options.css";
export default function Options(props) {
  return (
    <div className="options-container">
      <div onClick={() => props.setCurrentWord("Backspace")} className="btn">
        Backspace
      </div>
      <div onClick={props.shuffle} className="btn">
        Shuffle
      </div>
      <div onClick={props.handleEnter} className="btn">
        Enter
      </div>
      {props.children}
    </div>
  );
}
