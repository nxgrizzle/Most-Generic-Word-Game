import React from 'react'
import NewGame from './NewGame'
import "./header.css"
export default function Header(props) {
  return (
    <div className="header" style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"90vw"}}>
        <div className="btn" onClick={props.toggleAnswers}>{props.showAnswers ? "Hide Answers" : "Show Answers"}</div>
        <h1 style={{fontSize:"1.5rem", textAlign:"center"}}>The Most Generic Word Game</h1>
        <NewGame newGame={props.newGame} width={props.width}/>
    </div>
  )
}
