import React from 'react'
import "./newgame.css"
import { useState } from 'react'
export default function NewGame(props) {
    const [modal, setModal] = useState(false)
    const removeModal = (e) =>{
        if(Array.from(e.target.classList).includes("modal-container") || Array.from(e.target.classList).includes("close")) setModal(false)
    }
    const addModal = (e) =>{
        console.log(e.currentTarget)
        setModal(true)
    }
    // have an x that toggles modal
    const toggleGame = (length) =>{
        props.newGame(length)
        setModal(false)
    }
    return (
    <>
        <div className="btn" onClick={e=>addModal(e)}>New Game</div>
        <div onClick={e=>removeModal(e)}className={`modal-container ${modal ? "active" : ""}`}>
            <div className={`modal grid ${props.width < 1000 ? "grid--one" : "grid--three"}`}>
                <div className="close" onClick={e=>removeModal(e)}>X</div>
                <div onClick={()=>toggleGame(6)} className="grid-item">
                    <p>You have 6 letters.</p>
                    <p>Find words that have three or more letters in them.</p>
                    <h3>Easy</h3>
                </div>
                <div onClick={()=>toggleGame(7)} className="grid-item">
                    <p>You have 7 letters.</p>
                    <p>Find words that have four or more letters in them.</p>
                    <h3>Normal</h3>
                </div>
                <div onClick={()=>toggleGame(8)} className="grid-item">
                    <p>You have 8 letters.</p>
                    <p>Find words that have five or more letters in them.</p>
                    <h3>Hard</h3>
                </div>
            </div>
        </div>
    </>
  )
}
