import React from 'react'

export default function Options(props) {
  return (
      <>
        <div onClick={()=>props.setCurrentWord("Backspace")}className="btn">Backspace</div>
        <div onClick={props.shuffle}className="btn">Shuffle</div>
        <div onClick={props.handleEnter}className="btn">Enter</div>
        <div style={{gridColumn:"2/span 1"}} onClick={props.toggleHint} className="btn">{props.showHint? "Hide" : "Show"} Hint</div>
      </>
  )
}
