import React, { use, useCallback, useState } from 'react'
import QUESTION from '../../question.js'
import QuestionTimer from './QuestionTimer.jsx';


const TIMEOUT = 10000;

const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = userAnswers.length === QUESTION.length;

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

    const shuffledAnswers = React.useMemo(() => {
        const answers = [...QUESTION[activeQuestionIndex].answers];
        answers.sort(() => Math.random() - 0.5);
        return answers;
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null)
    }, [handleSelectAnswer]);

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
                        shuffledAnswers.map((answer) => (
                            <li key={answer} className='answer' onClick={() => handleSelectAnswer(answer)}>
                                <button>{answer}</button>
                            </li>
                        ))
                    }

                </ul>
            </div>
        </div>

    )
}

export default Quiz