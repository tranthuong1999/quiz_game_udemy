import React from 'react'
import QuestionTimer from './QuestionTimer'
import Answers from './Answers'

const TIMEOUT = 10000;


const Question = ({
    questionText,
    answers,
    selectedAnswer,
    answerState,
    onSelectAnswer,
    onSkipAnswer,
}) => {
    return (
        <div id="question">
            <QuestionTimer
                timeout={TIMEOUT}
                onTimeout={onSkipAnswer}
            />
            <h2> {questionText}</h2>
            <Answers
                answers={answers}
                selectedAnswer={selectedAnswer}
                answerState={answerState}
                onSelect={onSelectAnswer}
            />
        </div>
    )
}

export default Question
