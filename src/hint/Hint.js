import React from "react";
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
      width: props.width < 800 ? "60vw" : "40vw",
      height: props.width < 800 ? "30vh" : "40vh",
    },
  };
  return (
    <>
      <div
        onClick={() => props.setModal((prev) => ({ ...prev, hint: true }))}
        className="btn btn--center"
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
        <div className="hint-container">
          <p>{props.hint}</p>
          <div className="btn" onClick={props.generateHint}>
            Generate New Hint
          </div>
        </div>
      </Modal>
    </>
  );
}
