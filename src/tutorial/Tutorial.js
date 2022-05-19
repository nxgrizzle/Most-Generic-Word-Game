import React from "react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import "./tutorial.css";
export default function Tutorial(props) {
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (props.firstTime) setModal(true);
  }, [props.firstTime]);

  const handleClose = () => {
    setModal(false);
    if (props.firstTime) props.setFirstTime(false);
  };
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
      width: "25rem",
      height: "30rem",
    },
  };
  return (
    <>
      <div onClick={() => setModal(true)} style={{ marginLeft: "0.5rem" }}>
        <FontAwesomeIcon
          icon={faCircleQuestion}
          size="2xl"
          className="fa-icon"
        />
      </div>
      <Modal
        appElement={document.getElementById("root") || undefined}
        closeTimeoutMS={200}
        style={style}
        isOpen={modal}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={props.modal.overlayClick}
        shouldCloseOnEsc={props.modal.escClick}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <h2>How to Play The Generic Word Game</h2>

          <h3 style={{ marginTop: "1rem" }}>
            Create words using letters from the hive.
          </h3>
          <ul
            style={{
              marginTop: "1rem",
              marginLeft: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            <li>Words must contain at least {props.length - 3} letters.</li>
            <li>Words must include the center letter.</li>
            <li>Letters can be used more than once.</li>
            <li>
              All the words in our word list come from the official Scrabble
              dictionary.
            </li>
            <li>Score points to increase your rating.</li>
            <li>Each word is worth 1 point per letter</li>
            <li>Each puzzle has one special word called a "pangram".</li>
            <li>
              A pangram is a word that uses every letter in the puzzle. These
              are worth 10 extra points!
            </li>
          </ul>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="btn"
              style={{ width: "100px" }}
              onClick={handleClose}
            >
              Okay
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
