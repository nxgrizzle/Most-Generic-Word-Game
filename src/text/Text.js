import React from 'react'
import { useState, useEffect,useRef } from 'react'
import "./text.css"
import anime from 'animejs'
export default function Text(props) {
    // split this into an eventlistener and an animator prop
    
    const messageRef = useRef(null)
    const [current, setCurrent] = useState(props.message)
    const [animeRef, setAnimeRef] = useState({})
    useEffect(()=>{
        setAnimeRef({
        correct: anime({
            targets: messageRef.current,
            keyframes: [
                {translateY:"-10%", color:"#000", backgroundColor:"#fff", duration:1},
                {translateY:"-25%", opacity:1},
                {translateY: "10%", opacity:0, delay:300, duration:180},
            ],
            easing:"easeInSine",
            autoplay:false
        }),
        incorrect: anime({
            targets:messageRef.current, 
            color:"#fff",
            backgroundColor:"#000",
            keyframes:[
                {color:"#fff", backgroundColor:"#000", duration:1},
                {translateX:"-5%", opacity:1},
                {translateX:"5%"},
                {translateX:"-2.5%"},
                {translateX:"2.5%"},
                {translateX:"0%", opacity:0},
            ],
            autoplay:false,
            easing:"easeInOutSine", 
        })
    })
    },[])
    useEffect(()=>{
        // if props.message
        // okay so this only half works
        // and only if the question is wrong, never right

        if(props.message){
            setCurrent(props.message)
            if(props.message.includes("Nice"))animeRef.correct.restart()
            else animeRef.incorrect.restart()
        }
    }, [props.message])
    const handleKeyDown = (e) =>{
        const letter = e.key
        if(props.letters.includes(letter.toUpperCase())){
            props.setCurrentWord(letter.toUpperCase())
            props.setMessage("")
        }
        else if (letter==="Backspace"){
            props.setCurrentWord(letter)
        }
        // else if check backspace to undo a letter
        // else if check enter to try and submit word
        else if (letter==="Enter"){
            props.handleEnter()
        }
        // else if check space to shuffle
        else if (letter===" "){
            e.preventDefault()
            props.shuffle()
        }
        // else if check esc to show answers
        else if (letter==="Escape"){
            props.toggleAnswers()
        }
        else if(letter.length > 1){
            // probably not a letter
            return
        }
        else{
            props.setMessage("Invalid key pressed.")
            animeRef.incorrect.restart()
        }
    }
    useEventListener("keydown", handleKeyDown)
    return (
        <>
        <div className="message-container" style={{height:"1rem", margin:"0.5rem 0 0 0"}}>
        <div className="message" ref={messageRef}>
            {<p style={{border:"2px solid black", padding:"2px", borderRadius:"5px"}}>{current}</p>}
            </div>
        </div>
        <div className="input-container">
            <div className="text" style={{verticalAlign:"top", height:"1rem"}}>{props.current.toLowerCase()}</div>
            <span className="blink"></span>
        </div>
    </>
  )
}

function useEventListener(eventName, handler) {
    const handlerRef = useRef();
    // save the handler in a ref
    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);
    useEffect(() => {
      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => handlerRef.current(event);
      // Add event listener
      window.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        window.removeEventListener(eventName, eventListener);
      };
    },[eventName])
}