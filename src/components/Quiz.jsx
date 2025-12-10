import React, { useCallback, useState } from 'react'
import QUESTION from '../../question.js'
import Question from './Question.jsx';

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const quizIsComplete = userAnswers.length === QUESTION.length;
    const [answerState, setAnswerState] = useState('');
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setAnswerState('answered');
        setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

        setTimeout(() => {
            if (QUESTION[activeQuestionIndex].answers[0] === selectedAnswer) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }
            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000)
    }, [activeQuestionIndex]);

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
                questionText={QUESTION[activeQuestionIndex].text}
                answers={QUESTION[activeQuestionIndex].answers}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                answerState={answerState}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>

    )
}

export default Quiz