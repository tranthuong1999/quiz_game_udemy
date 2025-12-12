import React, { useCallback, useState } from 'react'
import QUESTION from '../../question.js'
import Question from './Question.jsx';

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const quizIsComplete = userAnswers.length === QUESTION.length;
    const activeQuestionIndex = userAnswers.length 

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    }, []);

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img alt="Trophy icon" />
                <h2>Quiz Complete</h2>
            </div>
        )
    }

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null)
    }, [handleSelectAnswer]);

    console.log("userAnswers", userAnswers)

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>

    )
}

export default Quiz