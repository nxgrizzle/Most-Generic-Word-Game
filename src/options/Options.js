import React from 'react'
import Hint from "../hint/Hint"
export default function Options(props) {
  return (
      <div className="options-container" style={{display:"grid", gridGap:"5px", gridTemplateColumns:"repeat(3,1fr)", marginTop:"1rem"}}>
        <div onClick={()=>props.setCurrentWord("Backspace")}className="btn">Backspace</div>
        <div onClick={props.shuffle}className="btn">Shuffle</div>
        <div onClick={props.handleEnter}className="btn">Enter</div>
        <Hint modal={props.modal} setModal={props.setModal} hint={props.hint} generateHint={props.generateHint}/>
      </div>
  )
}
