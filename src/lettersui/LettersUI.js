import React from 'react'
import './lettersui.css'
import anime from "animejs"
import { Flipper, Flipped} from 'react-flip-toolkit'
export default function LettersUI(props) {
const exitThenFlipThenEnter = ({
  hideEnteringElements,
  animateEnteringElements,
  animateExitingElements,
  animateFlippedElements
}) => {
  hideEnteringElements();
  animateExitingElements()
    .then(animateFlippedElements)
    .then(animateEnteringElements);
};
    const elementIn = (el, i) =>{
        anime({
            targets: el,
            opacity: 1,
            easing: "easeOutSine",
            duration:250
        });
    }
    const elementOut = (el, i, onComplete) =>{
        anime({
            targets: el,
            opacity: 0,
            easing: "easeOutSine",
            duration:500,
            complete: onComplete
        });
    }
    const stopPropagation = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation();
    }
    const handleOptionalClick = (e) =>{
        stopPropagation(e)
        console.log(e.currentTarget.innerHTML)
        props.setCurrentWord(e.currentTarget.innerHTML)

    }
    const handleRequiredClick = () => {
        console.log(props.circles[0])
        props.setCurrentWord(props.circles[0])
    }

    return (
      <div className="letters-container">
        <Flipper handleEnterUpdateDelete={exitThenFlipThenEnter} stagger 
        flipKey={props.circles.join("")} onClick={handleRequiredClick}  
        className="circle circle--required" spring={"stiff"} 
        easing="cubic-bezier(0.53, 1.3, 0.79, 1)" duration={500}> 
            {props.circles.map((letter, index, arr)=>{
            const total = arr.length-1
            const div = 360 / total
            const radius = props.width < 800 ? 100 : 125
            const parent = document.getElementsByClassName("circle--required")[0]
            const parentOffset = parseInt(parent.offsetWidth/2)
            const childOffset = props.width < 800 ? 40 : 55
            const offset = parentOffset-childOffset
            const y = Math.sin(((Math.PI)/2)+(div * (index+1)) * (Math.PI / 180)) * radius*-1;
            const x = Math.cos(((Math.PI)/2)+(div * (index+1)) * (Math.PI / 180)) * radius*-1;
            const fx = `${x+offset}px`
            const fy =  `${y+offset}px`
            const styles={display:"flex", 
                justifyContent:"center", 
                alignItems:"center",
                position:"absolute", 
                left:fx, 
                top:fy}
            if(index!==0) return <Flipped  
            onAppear={elementIn} onExit={elementOut}
            flipId={`${letter}${props.id}`} key={`${letter}${props.id}`}>
                <div onClick={(e)=> handleOptionalClick(e)} 
                    key={letter} 
                    style={styles} 
                    className="circle circle--optional">
                    {letter}
                    </div>
                    </Flipped>
            return <Flipped translate={false} scale={false} opacity={true} onAppear={elementIn} onExit={elementOut} flipId={`${letter}--required`} key={letter}><div className="required-letter">{letter}</div></Flipped>
            })}
            </Flipper>
            {props.children}
    </div>
  )
}

// game id is used to determine whether to shuffle or remove/add new game
// refactor to make this prettier and add code at some point