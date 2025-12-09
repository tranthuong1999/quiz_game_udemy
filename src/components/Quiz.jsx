import React, { useCallback, useState } from 'react'
import QUESTION from '../../question.js'
import QuestionTimer from './QuestionTimer.jsx';


const TIMEOUT = 10000;

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

    const shuffledAnswers = React.useMemo(() => {
        const answers = [...QUESTION[activeQuestionIndex].answers];
        answers.sort(() => Math.random() - 0.5);
        return answers;
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null)
    }, [handleSelectAnswer]);

    console.log("userAnswers", userAnswers)

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer
                    key={activeQuestionIndex}
                    timeout={TIMEOUT}
                    onTimeout={handleSkipAnswer}
                />
                <h2> {QUESTION[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {
                        shuffledAnswers.map((answer) => {
                            const isSelected = userAnswers[userAnswers.length - 1] === answer;
                            let cssClass = ''
                            if (answerState === 'answered' && isSelected) {
                                cssClass = 'answered';
                            }

                            if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                                cssClass = answerState;
                            }
                            return (
                                <li key={answer} className='answer' onClick={() => handleSelectAnswer(answer)}>
                                    <button className={cssClass}>{answer}</button>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>

    )
}

export default Quiz