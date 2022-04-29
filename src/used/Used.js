import React from 'react'
import "./used.css"

export default function Used(props) {
  return (
    <div className={`words-container used ${(props.width < 800 && props.menu) ? "opened" : ""}`} style={{position:"relative"}}>
            {props.width < 800 && <div style={{position:"absolute", top:0, right:5, fontWeight:"bold", cursor:"pointer"}} onClick={props.toggleMenu}>{props.menu ? "ᐃ" : "ᐁ"}</div>}
            <ul className="used-words">
                {props.usedWords.map(word=>{
                    return <li key={word} className="used-words-li" style={{fontWeight:"bold"}}>{word.toLowerCase()}</li>
                })}
            </ul>
        </div>
  )
}

/*
{width < 1000 && <div className={`words-container used ${(width < 1000 && menu) ? "opened" : ""}`} style={{position:"relative"}}>
            {width < 1000 && <div className={`${menu ? "rotated" : ""} dropdown`} style={{position:"absolute", top:0, right:"5px", fontWeight:"bold", cursor:"pointer"}} 
            onClick={toggleMenu}>ᐁ</div>}
            <ul className="used-words">
            {game.usedWords.map(word=>{
                return <li key={word} className="used-words-li" style={{fontWeight:"bold"}}>{word.toLowerCase()}</li>
            })}
            </ul>
        </div>}
*/