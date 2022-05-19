import React from "react";
import NewGame from "../newgame/NewGame";
import Answers from "../answers/Answers";
import "./header.css";
import Tutorial from "../tutorial/Tutorial";
export default function Header(props) {
  return (
    <>
      <div className="header">
        <Answers
          setModal={props.setModal}
          modal={props.modal}
          usedWords={props.usedWords}
          toggleAnswers={props.toggleAnswers}
          showAnswers={props.showAnswers}
          answers={props.answers}
        />
        <div className="title-container">
          <h1>The Most Generic Word Game</h1>
          {props.width >= 800 && (
            <h2>
              {props.length === 6
                ? "Easy"
                : props.length === 7
                ? "Normal"
                : "Hard"}{" "}
              Mode
            </h2>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NewGame
            setGame={props.setGame}
            modal={props.modal}
            addModal={props.addModal}
            removeModal={props.removeModal}
            newGame={props.newGame}
            setModal={props.setModal}
            width={props.width}
          />
          <Tutorial
            modal={props.modal}
            setModal={props.setModal}
            length={props.length}
            firstTime={props.firstTime}
            setFirstTime={props.setFirstTime}
          />
        </div>
      </div>
      {props.width < 800 && (
        <div className="subheader-container">
          <p>
            {props.length === 6
              ? "Easy"
              : props.length === 7
              ? "Normal"
              : "Hard"}{" "}
            Mode
          </p>
          <p>Min: {props.length - 3} letters</p>
        </div>
      )}
    </>
  );
}
