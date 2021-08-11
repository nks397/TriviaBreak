import React, { useState} from "react"
const QuizContext = React.createContext()

function TriviaProvider({children}){
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [length, setLength] = useState(0)
    const [displayScore, setDisplayScore] = useState(false)

    function handleNextBtn() {
        // console.log(currentQuestion, "currentQuestion")
        // console.log(length, "length")

        if(currentQuestion < length - 1){
             return setCurrentQuestion(currentQuestion + 1)
        } else {
            setDisplayScore(true)
        } 
    }
    
    function handlePrevBtn() {
        if(currentQuestion > 0){
             return setCurrentQuestion(currentQuestion - 1)
        }
    }

	return (
		<QuizContext.Provider value={{
            handleNextBtn,
            handlePrevBtn,
            displayScore,
            currentQuestion,
            length,
            setLength
        }}>
            {children}
        </QuizContext.Provider>
	)
}

export {TriviaProvider, QuizContext}