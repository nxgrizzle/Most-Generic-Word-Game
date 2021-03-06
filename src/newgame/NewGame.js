import React from "react";
import "./newgame.css";
import Modal from "react-modal";
export default function NewGame(props) {
  const toggleGame = (length) => {
    props.newGame(length);
    props.setModal((prev) => ({ ...prev, newGame: false }));
  };
  const style = {
    overlay: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(25,25,25,.75)",
    },
    content: {
      display: "grid",
      gridTemplateColumns: `${props.width < 650 ? "1fr" : "repeat(3, 1fr)"}`,
      gridGap: "10px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "white",
      width: "70vw",
      height: `${props.width < 650 ? "80vh" : "40vh"}`,
    },
  };
  return (
    <>
      <div
        className="btn"
        onClick={(e) => props.setModal((prev) => ({ ...prev, newGame: true }))}
      >
        New Game
      </div>
      <Modal
        appElement={document.getElementById("root") || undefined}
        closeTimeoutMS={400}
        style={style}
        isOpen={props.modal.newGame}
        onRequestClose={() =>
          props.setModal((prev) => ({ ...prev, newGame: false }))
        }
        shouldCloseOnOverlayClick={props.modal.overlayClick}
        shouldCloseOnEsc={props.modal.escClick}
      >
        <div onClick={() => toggleGame(6)} className="grid-item">
          <p>You have 6 letters.</p>
          <p>Find words that have three or more letters in them.</p>
          <h3>Easy</h3>
        </div>
        <div onClick={() => toggleGame(7)} className="grid-item">
          <p>You have 7 letters.</p>
          <p>Find words that have four or more letters in them.</p>
          <h3>Normal</h3>
        </div>
        <div onClick={() => toggleGame(8)} className="grid-item">
          <p>You have 8 letters.</p>
          <p>Find words that have five or more letters in them.</p>
          <h3>Hard</h3>
        </div>
      </Modal>
    </>
  );
}
