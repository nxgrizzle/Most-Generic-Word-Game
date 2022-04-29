import React from 'react'
import Modal from 'react-modal'
import { useState, useEffect} from 'react'
export default function Tutorial(props) {
    const [modal, setModal] = useState(false)
    useEffect(()=>{
      if(props.firstTime) setModal(true)
    },[props.firstTime])

    const handleClose = () =>{
        setModal(false)
        if(props.firstTime) props.setFirstTime(false)
    }
    const style={
        overlay:{display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"rgba(25,25,25,.75)"}, 
        content:{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", background:"white", width:"80vw", height:"50vh"}
    }
    // give this a button somewhere, like Help.
  return (
    <Modal closeTimeoutMS={200} style={style} isOpen={modal} onRequestClose={handleClose} shouldCloseOnOverlayClick={props.modal.overlayClick} shouldCloseOnEsc={props.modal.escClick}>
        <div>
          <h2>How to Play The Generic Word Game</h2>
          <h3>Create words using letters from the hive.</h3>
          <ul>
            <li>Words must contain at least {props.length-3} letters.</li>
            <li>Words must include the center letter.</li>
            <li>Letters can be used more than once.</li>
            <li>All the words in our word list come from the official Scrabble dictionary.</li>
          </ul>
          <p>Score points to increase your rating.</p>
          <ul style={{marginBottom:"1rem"}}>
            <li>Each word is worth 1 point per letter</li>
            <li>Each puzzle has one special word called a "pangram".</li>
              <ul style={{marginLeft:"2rem"}}>
                <li>This word that uses every letter in the puzzle. These are worth 10 extra points!</li>
              </ul>
          </ul>
          <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}><div className="btn" style={{width:"100px"}} onClick={handleClose}>Okay</div></div>
        </div>
    </Modal>
  )
}
