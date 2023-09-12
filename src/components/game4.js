import React, { useState } from 'react';



function LanguageLearningExercise() {

    const data = [
        { Id: 1, src: 'animals/lion.webp', btn1: 'Crocodile', btn2: 'Horse', btn3: 'Lion', btn4: 'Tiger', correctOption: 'Lion' },
        { Id: 2, src: 'animals/bird.png', btn1: 'Bird', btn2: 'Lion', btn3: 'Penguin', btn4: 'Horse', correctOption: 'Bird' },
        { Id: 3, src: 'animals/horse.webp', btn1: 'Zebra', btn2: 'Elephant', btn3: 'Horse', btn4: 'Giraffe', correctOption: 'Horse' },
        { Id: 4, src: 'animals/bear.webp', btn1: 'Bear', btn2: 'Kangaroo', btn3: 'Panda', btn4: 'Tiger', correctOption: 'Bear' },
        { Id: 5, src: 'animals/dog.webp', btn1: 'Cat', btn2: 'Dog', btn3: 'Rabbit', btn4: 'Sheep', correctOption: 'Dog' },
        { Id: 6, src: 'animals/snake.webp', btn1: 'Lizard', btn2: 'Snake', btn3: 'Frog', btn4: 'Turtle', correctOption: 'Snake' },
        { Id: 7, src: 'animals/butterfly.png', btn1: 'Butterfly', btn2: 'Dragonfly', btn3: 'Ladybug', btn4: 'Bee', correctOption: 'Butterfly' },
        { Id: 8, src: 'animals/cat.webp', btn1: 'Dolphin', btn2: 'Lion', btn3: 'Tiger', btn4: 'Cat', correctOption: 'Cat' },
        { Id: 9, src: 'animals/bunny.webp', btn1: 'Koala', btn2: 'Bunny', btn3: 'Hedgehog', btn4: 'Squirrel', correctOption: 'Bunny' },
        { Id: 10, src: 'animals/dolphin.webp', btn1: 'Shark', btn2: 'Fish', btn3: 'Dolphin', btn4: 'Whale', correctOption: 'Dolphin' }
];
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
