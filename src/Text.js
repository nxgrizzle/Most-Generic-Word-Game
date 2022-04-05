import React from 'react'
import { useEffect,useRef } from 'react'
import "./text.css"

export default function Text(props) {
    //make it so it always focuses after interaction
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
        }
    }
    useEventListener("keydown", handleKeyDown)
    // need to figure out how useEventListener actually works
    // also, how to update a p class in an appropriate way
    return (
        <>
        <div className="message-container" style={{height:"1rem", margin:"0.25rem 0 0.75rem 0"}}>
        <p>{props.message}</p>
        </div>
        <div className="input-container">
            <div className="text" style={{verticalAlign:"top", height:"1rem"}}>{props.current.toLowerCase()}</div>
            <span className="blink"></span>
        </div>
    </>
  )
}

function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
    const savedHandler = useRef();
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);
    useEffect(() => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);
      // Add event listener
      element.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
        [eventName, element]) // Re-run if eventName or element changes
    }  