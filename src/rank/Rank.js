import React from 'react'
import { useState } from 'react'
export default function Rank(props) {
    // calculate rank
    // display rank and minimum score

    const [modal, setModal] = useState(false)
    const removeModal = (e) =>{
        if(Array.from(e.target.classList).includes("modal-container") || Array.from(e.target.classList).includes("close")) {
          setModal(false)
        }
    }
    const addModal = (e) =>{
        console.log(e.currentTarget)
        setModal(true)
    }
    const minScore = (percentage) => {
        return Math.floor(props.maxScore * (percentage/100))
    }    
  return (
    <>
        <p>Score: {props.score}/{props.maxScore}. <span style={{display:"inline-flex", marginLeft:"2vw"}} className="btn" onClick={addModal}>{props.userRank}</span></p>
            <div onClick={e=>removeModal(e)}className={`modal-container ${modal ? "active" : ""}`}>
                <div className={`modal`}>
                <div className="close" onClick={e=>removeModal(e)}>X</div>
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
            </div>
        </div>
    </>
  )
}
