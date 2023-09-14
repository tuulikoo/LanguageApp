import React, { useState } from 'react';
import animals from '../utils/wordlists/animals.json';



function LanguageLearningExercise() {

    const data = animals;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');

    const handleOptionClick = (option) => {
        if (option === data[currentQuestion].correctOption) {
            setScore(score + 1);
            setMessage('Correct!');
            setTimeout(() => {
                handleNextQuestion();
            }, 1000);
        } else {
            setMessage('Wrong! Try again.');
        }
    };

    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setMessage('');
    };

    const renderOptions = () => {
        const options = ['btn1', 'btn2', 'btn3', 'btn4'];
        return options.map((option, index) => (
            <button key={index} onClick={() => handleOptionClick(data[currentQuestion][option])}>
                {data[currentQuestion][option]}
            </button>
        ));
    };

    const renderMessage = () => {
        return message ? <div>{message}</div> : null;
    };

    return (
        <div>
            <h1>Language Learning Exercise</h1>
            {currentQuestion < data.length ? (
                <div>
                    <img src={data[currentQuestion].src} alt={`Animal ${data[currentQuestion].Id}`} />
                    <div>{renderOptions()}</div>
                    {renderMessage()}
                </div>
            ) : (
                <div>
                    <h2>Exercise Completed!</h2>
                    <p>You scored {score} out of {data.length}.</p>
                </div>
            )}
        </div>
    );
}

export default LanguageLearningExercise;
