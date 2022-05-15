import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./answers.css";
export default function Answers(props) {
  const handleOpen = () => {
    props.toggleAnswers();
    props.setModal((prev) => ({ ...prev, answers: true }));
  };
  const handleClose = () => {
    props.toggleAnswers();
    props.setModal((prev) => ({ ...prev, answers: false }));
  };
  useEffect(() => {
    props.setModal((prev) => ({ ...prev, answers: props.showAnswers }));
  }, [props.showAnswers]);
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
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      width: "80vw",
      height: "60vh",
    },
  };

  return (
    <>
      <div className="btn" onClick={handleOpen}>
        {props.showAnswers ? "Hide Answers" : "Show Answers"}
      </div>
      <Modal
        appElement={document.getElementById("root") || undefined}
        closeTimeoutMS={200}
        style={style}
        isOpen={props.modal.answers}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={props.modal.overlayClick}
        shouldCloseOnEsc={props.modal.escClick}
      >
        <ul className="answers">
          {props.answers.map((word, i) => {
            return (
              <li
                key={i}
                className="answers--li"
                style={{
                  fontWeight: `${
                    props.usedWords.includes(word) ? "normal" : "bold"
                  }`,
                }}
              >
                {word.toLowerCase()}
              </li>
            );
          })}
        </ul>
      </Modal>
    </>
  );
}
