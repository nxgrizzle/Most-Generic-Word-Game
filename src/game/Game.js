import React from 'react'
import "./game.css"
import { useState, useEffect, useLayoutEffect } from 'react'
import LettersUI from '../lettersui/LettersUI'
import Header from '../header/Header'
import Text from '../text/Text'
import Rank from "../rank/Rank"
import Options from '../options/Options'

// GOALS
// move event listeners to main game and make text.js a display only
// make modal a functioning thing that changes in size.


// add a show/hide answers thing
// add that button
// do some styling
// then done tbh
// and newgame screen would be a bull thing with a grid for each row stacked
// add hints

// no highlight

// good lord i need to do some sectioning off lmao

// need to do a good refactor
// i can put the dictionary file and the pangram files into a single json with everything in lists.

// messages stop playing on mobile? after a single message shows
// no such thing happens on computer

export default function Game() {
    const [game, setGame] = useState({showAnswers:false, validWords:[], letters:[], usedWords:[], score:0, 
        maxScore:0, requiredLetter:"", currentWord:"" , message:"", showHint:false, hint:"", hintMap:{}, rank:"Newbie"})
    const generateHint = () =>{
            const keys = Object.keys(game.hintMap)
            const num = Math.floor(Math.random() * keys.length)
            const phrase = keys[num]
            const number = game.hintMap[phrase]
            const fullString = `There ${number >= 2 ? "are" : "is"} still ${number} word${number >=2 ?"s" : ""} that ha${number >= 2 ? "ve" : "s"} ${phrase}`
            setGame(prev=>({...prev, hint:fullString}))
    }
    useEffect(()=>{
        const stored_game = localStorage.getItem("game")
        const game = JSON.parse(stored_game)
        game ? setGame(game) : importPangram(7);
    },[])
    useEffect(()=>{
            generateHint()
        
    },[game.showHint, game.hintMap])
    useEffect(()=>{
        const stored_game = JSON.stringify({...game, message:""})
        localStorage.setItem("game", `${stored_game}`)},
    [game])
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
    const rank = (score) =>{
        const percentage = (score/game.maxScore)*100
        let userRank
        if(percentage < 5 && percentage >= 2) userRank="Beginner"
        else if(percentage < 8 && percentage >=5) userRank = "Improving"
        else if(percentage < 15 && percentage >= 8) userRank = "Average"
        else if(percentage < 25 && percentage >= 15) userRank = "Satisfactory"
        else if(percentage < 40 && percentage >= 25) userRank = "Nifty"
        else if(percentage < 50 && percentage >= 40) userRank = "Superb"
        else if(percentage < 70 && percentage >= 50) userRank = "Awesome"
        else if(percentage < 100 && percentage >= 70) userRank = "Genius"
        else if(percentage >= 100) userRank = "Godly"
        else userRank = "Newbie"
        return userRank
    }
    const shuffle = () =>{
        const newLetters = placeReqLetterFirst(randomize(game.letters), game.requiredLetter)
        setGame((prev)=>({...prev, letters:newLetters}))
    }
    const importPangram = (length) => {
        let txt;
        if(length === 6) txt="six";
        else if(length === 7) txt="seven";
        else if(length ===8) txt="eight";
        else return
        
        fetch("final.json", {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(r=>r.json())
        .then(data=>{
            console.log(data)
            const pangrams = data[txt]
            const words = data["dictionary"]
            // get a random number, and choose the pangram
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
            const hintMap = {}
            const begPhrase = "at the beginning."
            const endPhrase = "at the end."
            for(const num in validWords) {
                const word = validWords[num]
                const begString = `"${word.slice(0,2).toLowerCase()}" ${begPhrase}`
                const endString = `"${word.slice(-2).toLowerCase()}" ${endPhrase}`
                hintMap[begString] = hintMap[begString] + 1 || 1
                hintMap[endString] = hintMap[endString] + 1 || 1
            }
            // one point per letter, +10 for pangram
            const maxScore = validWords.reduce((acc,curr)=>acc+curr.length,10)
            setGame({showAnswers:false, usedWords:[],validWords:validWords, letters:letters, requiredLetter:requiredLetter, maxScore:maxScore, score:0, currentWord:"", message:"", hint:"",showHint:false, hintMap:hintMap, rank:"Newbie"})
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
        const hintMap = {...game.hintMap}
        const begPhrase = `"${game.currentWord.slice(0,2).toLowerCase()}" at the beginning.`
        const endPhrase = `"${game.currentWord.slice(-2).toLowerCase()}" at the end.`
        hintMap[begPhrase] = hintMap[begPhrase] -1
        hintMap[endPhrase] = hintMap[endPhrase] - 1
        usedWords.push(game.currentWord)
        usedWords.sort()
        const userRank = rank(score)
            // add points, usedWords
            // clear currentWord, set message to something nice
        setGame(prev=>({...prev, currentWord:"", score:score,  usedWords:usedWords, rank:userRank, hintMap:hintMap}))
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
    <div className="full" style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
        <Header usedWords={game.usedWords} length={game.letters.length} answers={game.validWords} toggleAnswers={toggleAnswers} showAnswers={game.showAnswers} newGame={importPangram} width={width}/>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", width:"90vw"}}>
        <p>You have found {game.usedWords.length} word{game.usedWords.length===1?"":"s"} out of {game.validWords.length}.</p>
        <Rank userRank={game.rank} maxScore={game.maxScore} score={game.score}/>
        </div>
        {width < 1000 && <div className={`words-container used ${(width < 1000 && menu) ? "opened" : ""}`} style={{position:"relative"}}>
            {width < 1000 && <div className={`${menu ? "rotated" : ""} dropdown`} style={{position:"absolute", top:0, right:"5px", fontWeight:"bold", cursor:"pointer"}} 
            onClick={toggleMenu}>ᐁ</div>}
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
        
        <div className="game-container" style={{height:`${width<1000? "320px":""}`, display:"flex", justifyContent:"center", alignItems:"center"}}>
        {game.letters && <div className="letters-container">
            <LettersUI setCurrentWord={setCurrentWord} circles={game.letters} width={width}/>
        </div>}
        {width >= 1000 && <div className={`words-container used ${(width < 1000 && menu) ? "opened" : ""}`} style={{position:"relative"}}>
            {width < 1000 && <div style={{position:"absolute", top:0, right:5, fontWeight:"bold", cursor:"pointer"}} 
            onClick={toggleMenu}>{menu ? "ᐃ" : "ᐁ"}</div>}
            <ul className="used-words">
            {game.usedWords.map(word=>{
                return <li key={word} className="used-words-li" style={{fontWeight:"bold"}}>{word.toLowerCase()}</li>
            })}
            </ul>
        </div>}
        </div>
        <div className="options-container" style={{display:"grid", gridGap:"5px", gridTemplateColumns:"repeat(3,1fr)", margin:`${width<1000? "0" : "10px 0"}`}}>
            <Options hint={game.hint} generateHint={generateHint} showHint={game.showHint} toggleHint={toggleHint} shuffle={shuffle} handleEnter={handleEnter} setCurrentWord={setCurrentWord} />
        </div>
    </div>
  )
}

// probably, when hit new game, open a modal which will have buttons for the size of the game (easy, med, hard)
// container over LettersUI keeps everything neat and tidy.

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