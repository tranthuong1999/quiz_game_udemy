import React, { useState } from 'react'
import QUESTION from '../../question.js'

const Quiz = () => {

    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    return (
        <div id="question">
            <h2> {QUESTION[activeQuestionIndex].text}</h2>
        </div>
    )
}

export default Quiz