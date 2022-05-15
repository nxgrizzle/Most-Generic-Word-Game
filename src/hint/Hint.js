import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import "./hint.css";
export default function Answers(props) {
  const style = {
    overlay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(25,25,25,.75)",
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      width: "80vw",
      height: "50vh",
    },
  };
  return (
    <>
      <div
        style={{ gridColumn: "2/span 1" }}
        onClick={() => props.setModal((prev) => ({ ...prev, hint: true }))}
        className="btn"
      >
        {props.modal.hint ? "Hide" : "Show"} Hint
      </div>
      <Modal
        appElement={document.getElementById("root") || undefined}
        closeTimeoutMS={200}
        style={style}
        isOpen={props.modal.hint}
        onRequestClose={() =>
          props.setModal((prev) => ({ ...prev, hint: false }))
        }
        shouldCloseOnOverlayClick={props.modal.overlayClick}
        shouldCloseOnEsc={props.modal.escClick}
      >
        <div
          style={{
            fontSize: "1.25rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            class="hint-container"
          >
            <p style={{ textAlign: "center", marginBottom: "1rem" }}>
              {props.hint}
            </p>
            <div className="btn" onClick={props.generateHint}>
              Generate New Hint
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
