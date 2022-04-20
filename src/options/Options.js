import React from 'react'
import Hint from "../hint/Hint"
export default function Options(props) {
  return (
      <>
        <div onClick={()=>props.setCurrentWord("Backspace")}className="btn">Backspace</div>
        <div onClick={props.shuffle}className="btn">Shuffle</div>
        <div onClick={props.handleEnter}className="btn">Enter</div>
        <Hint hint={props.hint} generateHint={props.generateHint}/>
      </>
  )
}
