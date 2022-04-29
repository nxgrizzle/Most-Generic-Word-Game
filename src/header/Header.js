import React from 'react'
import NewGame from '../newgame/NewGame'
import Answers from "../answers/Answers"
import "./header.css"
export default function Header(props) {
  return (
    <>
    <div className="header" style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"90vw"}}>
        <Answers setModal={props.setModal} modal={props.modal} usedWords={props.usedWords} toggleAnswers={props.toggleAnswers} showAnswers={props.showAnswers} answers={props.answers}/>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <h1 style={{fontSize:"1.5rem", textAlign:"center", marginBottom:"0.5rem"}}>The Most Generic Word Game</h1>
          {props.width >= 800 && <h3 style={{margin:0, fontSize:"1.2rem"}}>{props.length === 6 ? "Easy" : props.length === 7 ? "Normal" : "Hard"} Mode</h3>}
        </div>
        <NewGame setGame={props.setGame} modal={props.modal} addModal={props.addModal}  removeModal={props.removeModal} newGame={props.newGame} setModal={props.setModal} width={props.width}/>
    </div>
    {props.width < 800 && <div style={{fontWeight:"bold", display:'flex', justifyContent:`space-between`, alignItems:"center", width:"90vw"}}>
      
        <>
          <p>{props.length === 6 ? "Easy" : props.length === 7 ? "Normal" : "Hard"} Mode</p>
          <p>Min: {props.length-3} letters</p>
        </>
      
    </div>}

    </>
  )
}
