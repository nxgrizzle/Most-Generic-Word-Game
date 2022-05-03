import React from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
import "./rank.css"
export default function Rank(props) {
    // calculate rank
    // display rank and minimum score
    const minScore = (percentage) => {
        return Math.floor(props.maxScore * (percentage/100))
    }    
    const style={
        overlay:{display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"rgba(25,25,25,.75)"}, 
        content:{display:"flex", justifyContent:"center", alignItems:"center", position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", background:"white", width:"12rem", height:"17rem"}
    }
  return (
    <>
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", width:"90vw"}}>
        <p>You have found {props.usedWords.length} word{props.usedWords.length===1?"":"s"} out of {props.validWords.length}.</p>
        <p>Score: {props.score}/{props.maxScore}. <span style={{display:"inline-flex", marginLeft:"2vw"}} className="btn" onClick={()=>props.setModal(prev=>({...prev, rank:true}))}>{props.userRank}</span></p>
                    <Modal appElement={document.getElementById("root") || undefined} isOpen={props.modal.rank} closeTimeoutMS={200} style={style} onRequestClose={()=>props.setModal(prev=>({...prev, rank:false}))} shouldCloseOnOverlayClick={props.modal.overlayClick} shouldCloseOnEsc={props.modal.escClick}>
                        <div className="rank-container">
                        <p>Beginner: {minScore(2)}</p>
                        <p>Improving: {minScore(5)}</p>
                        <p>Average: {minScore(8)}</p>
                        <p>Satisfactory: {minScore(15)}</p>
                        <p>Nifty: {minScore(25)}</p>
                        <p>Superb: {minScore(40)}</p>
                        <p>Awesome: {minScore(50)}</p>
                        <p>Genius: {minScore(70)}</p>
                        <p>Godly: {props.maxScore}</p>
                </div>
                    </Modal>
    </div>    
    </>
  )
}
