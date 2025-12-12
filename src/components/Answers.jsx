import React, { useRef } from 'react'

const Answers = ({ answers, selectedAnswer, answerState, onSelect }) => {

    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {
                shuffledAnswers.current.map((answer) => {
                    const isSelected = selectedAnswer === answer;
                    let cssClass = ''
                    if (answerState === 'answered' && isSelected) {
                        cssClass = 'answered';
                    }

                    if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                        cssClass = answerState;
                    }
                    return (
                        <li key={answer} className='answer' onClick={() => onSelect(answer)}>
                            <button disabled={answerState !== ''} className={cssClass}>{answer}</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Answers
