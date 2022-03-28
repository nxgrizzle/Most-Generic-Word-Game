import React from 'react'
import "./game.css"
import six from "./words/six_pangrams.txt"
import seven from "./words/seven_pangrams.txt"
import eight from "./words/eight_pangrams.txt"
import dict from "./words/dictionary.txt"
import { useState, useEffect, useLayoutEffect } from 'react'
import LettersUI from './LettersUI'
import Header from './Header'
import Text from './Text'
import Options from './Options'
import { getActiveElement } from '@testing-library/user-event/dist/utils'

// add a show/hide answers thing
// add that button
// do some styling
// then done tbh
// just make it mobiel friendly
// and newgame screen would be a bull thing with a grid for each row stacked
// add hints

// no highlight
// wtf why hover
// on mobile views, add a hamburger that shows header and p info

// good lord i need to do some sectioning off lmao
export default function Game() {
    const [game, setGame] = useState({showAnswers:false, validWords:[], letters:[], usedWords:[], score:0, 
        maxScore:0, requiredLetter:"", currentWord:"" , message:"", showHint:false, hint:""})
    useEffect(()=>{importPangram(7)},[])
    useEffect(()=>{
        if(game.showHint){
            // get unused words
            const unusedWords = game.validWords.filter(word=>!game.usedWords.includes(word))
            // get word endings and get word beginnings
            console.log(unusedWords)
            const hints = unusedWords.reduce((acc,curr)=>{
                acc[curr.substring(2)] = acc[curr.slice(2)]  ? acc[curr.slice(2)]  + 1 : 0
                acc[curr.substring(-2)] = acc[curr.slice(-2)] ? acc[curr.slice(-2)] + 1 : 0
                return acc
            },{})
            const int = Math.random() * hints.keys().length
        }
    },[game.showHint, game.usedWords])
    const [width, height] = useWindowSize()
    const [menu, setMenu] = useState(false)
    const isPangram = (word) => game.letters.every(letter=> word.split("").includes(letter))
    const placeReqLetterFirst = (arr,letter)=>{
        const copy = [...arr]
        const index = copy.indexOf(letter)
        copy.splice(index, 1)
        copy.splice(0,0,letter)
        return copy
    }
    const randomize = (arr) =>{
        const copy = [...arr]
        const fin = []
        while(copy.length > 0){
            let num = Math.floor(Math.random() * copy.length)
            fin.push(copy[num])
            copy.splice(num,1)
        }
        return fin
    }
    const shuffle = () =>{
        const newLetters = placeReqLetterFirst(randomize(game.letters), game.requiredLetter)
        setGame((prev)=>({...prev, letters:newLetters}))
    }
    const importPangram = (length) => {
        let txt;
        if(length === 6) txt=six;
        else if(length === 7) txt=seven;
        else if(length ===8) txt=eight;
        else return
        Promise.all([
        fetch(txt).then(r=>r.text()), 
        fetch(dict).then(r=>r.text())])
        .then(([pangramList, wordList])=>{
            const pangrams = pangramList.split("\n") // if in bugtesting, this has to be '\r\n'
            const words = wordList.split("\n")
            // get a random number, and choose the pangram
            console.log(words)
            console.log(pangrams)
            const pNumber = Math.floor(Math.random() * pangrams.length)
            const pangram = pangrams[pNumber]
            // set the letters
            let letters = [...new Set(pangram.split(""))]
            // get a random number, choose the required letter
            const rNumber = Math.floor(Math.random() * length)
            const requiredLetter = letters[rNumber]
            // format letters
            letters = placeReqLetterFirst(letters,requiredLetter)
            // set the valid words, max score
            const validWords = []
            const minLength = length-3
            words.forEach(word=>{
                if(word.length >=minLength && word.includes(requiredLetter) && word.split("").every(letter=> pangram.includes(letter))){
                    // if a match, set the valid words
                    validWords.push(word)
                }
            })
            // one point per letter, +10 for pangram
            const maxScore = validWords.reduce((acc,curr)=>acc+curr.length,10)
            setGame({showAnswers:false, usedWords:[],validWords:validWords, letters:letters, requiredLetter:requiredLetter, maxScore:maxScore, score:0, currentWord:"", message:"", hint:"",showHint:false})
        })
    }
    const handleEnter = () =>{
            // check if short first
            let message
            if(game.currentWord.length < game.letters.length-3) message = "Word is too short."
            // then check if letter is missing
            else if(!game.currentWord.includes(game.requiredLetter)) message = "Does not include required letter."
            else if(game.validWords.includes(game.currentWord)){
                // has it been already been used? if yes, ignore
                if(game.usedWords.includes(game.currentWord)){
                    // change message
                    message = "Already used that word."
                }
                // nope, so send
                else{
                    message = isPangram(game.currentWord) ? "Pangram! Nice job!" : "Nice word!"
                    submitWord()
                }
            }
            // not valid, so send a message
            // easy is to clear a message after a successful keypress
            else{
                message = "Not a word in the dictionary."
            }
            setGame(prev=>({...prev, currentWord:"", message:message}))
    }
    const clearCurrentWord = () => {
        setGame(prev=>({...prev, currentWord:""}))
    }
    const setCurrentWord = (word) => {
        if(word==="Backspace"){
            if(game.currentWord.length !==0) setGame(prev=>({...prev, currentWord:game.currentWord.substring(0,game.currentWord.length-1)}))
        }
        else setGame(prev=>({...prev, currentWord:game.currentWord+word}))
    }
    const submitWord = () =>{
        const score = game.score + (isPangram(game.currentWord) ? game.currentWord.length+10 : game.currentWord.length)
        const usedWords = game.usedWords
        
        usedWords.push(game.currentWord)
        usedWords.sort()
            // add points, usedWords
            // clear currentWord, set message to something nice
        setGame(prev=>({...prev, currentWord:"", score:score,  usedWords:usedWords}))
        }
    const setMessage = (message) =>{
        setGame(prev=>({...prev, message:message}))
    }
    // add bar for used words like generic word game
    // add header
    const toggleAnswers = () => {
        setGame(prev=>({...prev, showAnswers:!game.showAnswers}))
    }
    const toggleMenu = () =>{
        setMenu(prev=>!prev)
    }
    const toggleHint = () =>{
        setGame(prev=>({...prev, showHint:!game.showHint}))
    }
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
        <Header toggleAnswers={toggleAnswers} showAnswers={game.showAnswers} newGame={importPangram}/>
        {width >= 1000 && <><p>You are in {game.letters.length === 6 ? "Easy" : game.letters.length === 7 ? "Normal" : "Hard"} Mode</p>
        <p>You must find words that have at least {game.letters.length-3} letters in them.</p></>}
        <p>You have found {game.usedWords.length} word{game.usedWords.length===1?"":"s"} out of {game.validWords.length}.</p>
        <p>Score: {game.score}/{game.maxScore}.</p>
        {width < 1000 && <div className={`words-container used ${(width < 1000 && menu) ? "opened" : ""}`} style={{position:"relative"}}>
            {width < 1000 && <div style={{position:"absolute", top:0, right:"5px", fontWeight:"bold", cursor:"pointer"}} 
            onClick={toggleMenu}>{menu ? "ᐃ" : "ᐁ"}</div>}
            <ul className="used-words">
            {game.usedWords.map(word=>{
                return <li className="used-words-li" style={{fontWeight:"bold"}}>{word.toLowerCase()}</li>
            })}
            </ul>
        </div>}
        <Text clearCurrentWord={clearCurrentWord} 
              setCurrentWord={setCurrentWord} submitWord={submitWord} 
              validWords={game.validWords} usedWords={game.usedWords} 
              letters={game.letters} 
              current={game.currentWord} requiredLetter={game.requiredLetter} 
              shuffle={shuffle} message={game.message} 
              setMessage={setMessage} handleEnter={handleEnter}
              toggleAnswers={toggleAnswers} showAnswers={game.showAnswers}/>
        
        <div className="game-container">
        {game.letters && <div className="letters-container">
            <LettersUI setCurrentWord={setCurrentWord} circles={game.letters} width={width}/>
        </div>}
        {width >= 1000 && <div className={`words-container used ${(width < 1000 && menu) ? "opened" : ""}`} style={{position:"relative"}}>
            {width < 1000 && <div style={{position:"absolute", top:0, right:5, fontWeight:"bold", cursor:"pointer"}} 
            onClick={toggleMenu}>{menu ? "ᐃ" : "ᐁ"}</div>}
            <ul className="used-words">
            {game.usedWords.map(word=>{
                return <li className="used-words-li" style={{fontWeight:"bold"}}>{word.toLowerCase()}</li>
            })}
            </ul>
        </div>}
        </div>
        <div className="options-container" style={{display:"grid", gridGap:"5px", gridTemplateColumns:"repeat(3,1fr)", margin:"10px 0"}}>
            <Options toggleHint={toggleHint} shuffle={shuffle} handleEnter={handleEnter} setCurrentWord={setCurrentWord} />
        </div>
        {game.showHint && game.validWords.map(word=> !game.usedWords.includes(word)).map(word=>{
            return <div><p></p></div>})}
        {game.showAnswers && <div className="words-container answer">
            <h3>Answers</h3>
            <ul class="answers">
            {game.validWords.map(word=>{
                return <li style={{fontWeight:`${game.usedWords.includes(word) ? "normal" : "bold"}`}}>{word.toLowerCase()}</li>
            })}
            </ul>
            </div>}
    </div>
  )
}

// probably, when hit new game, open a modal which will have buttons for the size of the game (easy, med, hard)
// container over LettersUI keeps everything neat and tidy.
//

function useWindowSize() {
    const [size, setSize] = useState([0,0])
    useLayoutEffect(()=>{
        function updateSize(){
            setSize([window.innerWidth, window.innerHeight])
        }
        window.addEventListener("resize", updateSize)
        updateSize()
        return () => window.removeEventListener("resize", updateSize)
    },[])
    return size
}