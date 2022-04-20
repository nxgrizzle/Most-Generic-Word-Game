import React from 'react'
import { useState,useEffect } from 'react'
import Modal from "../ui/Modal"
import "./answers.css"
export default function Answers(props) {
    const [modal, setModal] = useState(false)
    const removeModal = (e) =>{
        if(Array.from(e.target.classList).includes("modal-container") || Array.from(e.target.classList).includes("close")) {
          setModal(false)
          props.toggleAnswers()
        }
    }
    const addModal = (e) =>{
        console.log(e.currentTarget)
        props.toggleAnswers()
        setModal(true)
    }
    useEffect(()=>{
      setModal(props.showAnswers)
      console.log(props.showAnswers)
    },[props.showAnswers])

  return (
    <>
      <div className="btn" onClick={addModal}>{props.showAnswers ? "Hide Answers" : "Show Answers"}</div>
      <div onClick={e=>removeModal(e)}className={`modal-container ${modal ? "active" : ""}`}>
            <div className={`modal`}>
              <div className="close" onClick={e=>removeModal(e)}>X</div>
                <div className="answers-container">
                  <ul className="answers">
                {props.answers.map((word,i)=>{
                  return <li key={i} className="answers--li" style={{fontWeight:`${props.usedWords.includes(word) ? "normal" : "bold"}`}}>{word.toLowerCase()}</li>
                })}
                </ul>
                </div>
            </div>
        </div>
    </>
  )
}
