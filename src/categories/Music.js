import React, { useState, useContext } from "react"
import {useEffect} from "react"
import axios from "axios"
import {QuizContext} from "../context"
import _ from "lodash"

function Music() {
    const [questionArr, setQuestionArr] = useState([])
    const [incorrectArr, setIncorrectArr] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState([])
    const [answerChoices, setAnswerChoices] = useState("")
    const [answerShuffle, setAnswerShuffle] = useState("")
    const [score, setScore] = useState(0)

    const {
        handleNextBtn, 
        displayScore, 
        currentQuestion, 
        length, 
        setLength, 
        handlePrevBtn
    } = useContext(QuizContext)

    useEffect(()=>{
        axios.get("https://opentdb.com/api.php?amount=15&category=12&difficulty=medium&type=multiple")
        .then(res => res.data)
        .then(questionsList => {
            const listLength = questionsList.results.length
            setLength(listLength)
            setQuestionArr(questionsList.results)
            setIncorrectArr(questionsList.results.map(item => item.incorrect_answers))
            setCorrectAnswer(questionsList.results.map(item => item.correct_answer))
            setAnswerChoices(questionsList.results.map(item => {
                const incorrectAnswersIndex = item.incorrect_answers.length
                const randomIndex = Math.random() - (incorrectAnswersIndex-0) + 0
                item.incorrect_answers.splice(
                    randomIndex, 0, item.correct_answer
                )
                return {
                    ...item,
                    answers: item.incorrect_answers
                }
            }))
            setAnswerShuffle(questionsList.results.map(item => {
                let unshuffled = item.incorrect_answers
                let shuffled = unshuffled
                .map((a) => ({sort: Math.random(), value:a}))
                .sort((a,b) => a.sort - b.sort)
                .map((a) => a.value)
                .map((a)=> {return {value: a, isClicked:false}})
                console.log(shuffled, "shuffled")
                return shuffled
                
            }))
        })
    },[])
    
    // console.log(answerChoices, "answerChoices")
    // console.log(answerShuffle, "answerShuffle")
        
    function handleRightAns(answer, index) {
        if(answer.value === correctAnswer[currentQuestion]){
            if(answer.isClicked === false) {
                let newAnswerShuffle = answerShuffle
                newAnswerShuffle[currentQuestion][index].isClicked = true
                setAnswerShuffle(newAnswerShuffle)
                // console.log(newAnswerShuffle, "newAnswerShuffle")
                setScore(prevScore => prevScore + 1)
                // console.log("new score is", score)
            }     
        }
            // console.log(correctAnswer, "Correct Answer")
            
    }

    function decodedQuestions(){
        if (questionArr[currentQuestion]) {
            return _.unescape(questionArr[currentQuestion].question)
                .replace(/&#039;/g, "'")
                .replace(/&ldquo;/g, "\"")
                .replace(/&rdquo;/g, "\"")
                .replace(/&hellip;/g, "...")
                .replace(/&amp;/g, "&")
                .replace(/g&quot;/g, "'Qi")
                .replace(/g&eacute;/g, "??")
                .replace(/g&iacute;/g, "??")
                .replace(/g&uuml;/g, "??")
                .replace(/&aacute;/g, "??")
                
        } else {
            return null
        }
    }

    function decodedAnswers() {
        if(answerShuffle[currentQuestion]) {
            const answer = answerShuffle[currentQuestion].map((item, index) => 
                <button className="answers" onClick={()=>handleRightAns(item, index)}> 
                    {
                        item.value
                        .replace(/&#039;/g, "'")
                        .replace(/&ldquo;/g, "\"")
                        .replace(/&rdquo;/g, "\"")
                        .replace(/&quot;/g, "'")
                        .replace(/&eacute;/g, "??")
                        .replace(/&iacute;/g, "??")
                        .replace(/&uuml;/g, "??")
                        .replace(/&hellip;/g, "...")
                        .replace(/&amp;/g, "&")
                        .replace(/&aacute;/g, "??")
                    }
                </button>)
                return answer
        } else {
            return null 
        }
    }

    function reset() {
        return window.location.reload()
    }

    useEffect(() => {
        if(displayScore === true) {
            return reset()
        }
        if(currentQuestion > 0 && currentQuestion < 16) {
            return reset()
        }
        
    }, [])

    return (
        <div>
            {displayScore ? (
                <div className="display-container">
                    <div className="completed">Quiz Completed!</div>
                    <div className="score-container">
                        <h2 style={{paddingBottom:"2vh"}}>Score: {score}/{length}</h2>
                        <h2 style={{fontSize: "18px", paddingTop:"15px"}}>Want to play again? Feel free to replay this category or choose another category.</h2>
                        <button onClick={()=>reset()}>Replay Category</button>
                    </div>
                </div>
            ):(
            <div className="trivia-container">
                <h1 className="group-titles">Music Category</h1>
                <h2 className="question-number">Question {currentQuestion + 1} of {length}</h2>
                <h3 className="questions">{decodedQuestions()}</h3>
                <h3 className="answers">{decodedAnswers()}</h3>
                <button onClick={handlePrevBtn}><i class="fas fa-chevron-circle-left"></i> Previous</button>
                <button onClick={handleNextBtn}>Next <i class="fas fa-chevron-circle-right"></i></button>
            </div>
            )}
        </div>
    )
}
export default Music