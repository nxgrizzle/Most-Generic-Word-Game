import React from 'react'
import { useState } from 'react'
import Modal from "../ui/Modal"
import "./hint.css"
export default function Answers(props) {
    const [modal, setModal] = useState(false)
    const removeModal = (e) =>{
        if(Array.from(e.target.classList).includes("modal-container") || Array.from(e.target.classList).includes("close")) setModal(false)
    }
    const addModal = (e) =>{
        console.log(e.currentTarget)
        setModal(true)
    }

  return (
    <>
      <div style={{gridColumn:"2/span 1"}} onClick={addModal} className="btn">{modal? "Hide" : "Show"} Hint</div>
      <div onClick={e=>removeModal(e)}className={`modal-container ${modal ? "active" : ""}`}>
            <div className={`modal`} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <div className="close" onClick={e=>removeModal(e)}>X</div>
                <div style={{display:'flex',flexDirection:"column",justifyContent:"center", alignItems:"center"}}class="hint-container">
                    <p>{props.hint}</p>
                    <div className="btn" onClick={props.generateHint}>Generate New Hint</div>
                </div>
            </div>
        </div>
    </>
  )
}