import React from 'react'
import FlipMove from 'react-flip-move'
import './lettersui.css'
export default function LettersUI(props) {

    // the enter animation is buggy bc it does its own magic with absolute positioning


    /* 
    I could do something where I have a fade-in CSS thing, then add that class on animation start
    */
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
      <>
        <FlipMove onClick = {handleRequiredClick}  className="circle circle--required" enterAnimation={false} easing="cubic-bezier(0.53, 1.3, 0.79, 1)" duration={500}> 
            {props.circles.map((letter, index, arr)=>{
            const total = arr.length-1
            const div = 360 / total
            const radius = props.width < 1000 ? 100 : 140
            const parent = document.getElementsByClassName("circle--required")[0]
            const parentOffset = parseInt(parent.offsetWidth/2)
            const childOffset = props.width < 1000 ? 40 : 55
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
            if(index!==0) return <div onClick={(e)=> handleOptionalClick(e)} key={letter} style={styles} className="circle circle--optional">{letter}</div>
            return <div key={index} className="required-letter">{letter}</div>
            })}
            </FlipMove>
    </>
  )
}
