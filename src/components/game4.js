import React, {useEffect, useState} from 'react';
import animals from '../utils/wordlists/animals.json';
import {useUser} from '../utils/userContext';
import styles from '../styles/Game4.module.scss'; // Import the styles

function Game4() {
    const {user} = useUser();
    const data = animals;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(null); // Use the result state
    const [currentUserPoints, setCurrentUserPoints] = useState(0); // Initialize points as zero
    const [incorrectAttempts, setIncorrectAttempts] = useState(0); // Montako yritystä
    const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false); // Track if user has answered correctly

    useEffect(() => {
        // Haetaan pisteet jos käyttäjä on kirjautunut
        if (user) {
            async function fetchUserPoints() {
                try {
                    const response = await fetch('/api/user');
                    if (response.ok) {
                        const data = await response.json();
                        console.log('User data:', data);
                        setCurrentUserPoints(data.userPoints);
                    } else {
                        throw new Error('Failed to fetch user points');
                    }
                } catch (error) {
                    console.error('Error:', error.message);
                }
            }

            fetchUserPoints();
        }
    }, [user]);

    const handleOptionClick = async (option) => {
        if (!hasAnsweredCorrectly && option === data[currentQuestion].correctOption) {
            setScore(score + 1);
            setResult('Oikein!');
            setHasAnsweredCorrectly(true);

            // Update points only if the user is authenticated
            if (user) {
                try {
                    // Send an API request to update the user's points
                    const response = await fetch('/api/updatePoints', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: user.id, // Replace with your user ID property
                            newPoints: 1 // You may adjust the points increment as needed
                        }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        updatePointsAndUI(data.updatedPoints);
                    } else {
                        throw new Error('Failed to update user points');
                    }
                } catch (error) {
                    console.error('Error updating user points:', error);
                }
            }

            setTimeout(() => {
                handleNextQuestion();
            }, 1000);
        } else {
            // Eka virheellinen yritys
            if (incorrectAttempts === 0) {
                setResult('Väärin, yritä uudelleen!');
            } else {
                // Toka virheellinen yritys
                setResult(`Vastasit väärin, oikea vastaus oli ${data[currentQuestion].correctOption}`);
                // Viive
                setTimeout(() => {
                    handleNextQuestion();
                }, 2000);
            }
            setIncorrectAttempts(incorrectAttempts + 1);
        }
    };


    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setResult('');
        setIncorrectAttempts(0); // Reset incorrect attempts counter
        setHasAnsweredCorrectly(false); // Reset the flag for the next question
    };

    const renderOptions = () => {
        const options = ['btn1', 'btn2', 'btn3', 'btn4'];
        return options.map((option, index) => (
            <button className={styles.buttonStyle} key={index}
                    onClick={() => handleOptionClick(data[currentQuestion][option])}>
                {data[currentQuestion][option]}
            </button>
        ));
    };

    useEffect(() => {
        if (currentQuestion >= data.length) {
            // Tähän mitä tapahtuu pelin lopussa
        }
    }, [currentQuestion, data.length]);

    const updatePointsAndUI = (newPoints) => {
        setCurrentUserPoints(newPoints); // Update the points in the UI
    };

    return (
        <div>
            <h1>Valitse oikea sana</h1>
            <div className={styles.pointsDisplay}>
                {user ? (
                    <div>
                        Kokonaispisteesi: {currentUserPoints}
                    </div>
                ) : null}
                {user ? (
                    <div>
                        Tämän tehtävän pisteet: {score}
                    </div>
                ) : null}
                {!user ? (
                    <div>
                        Pisteet: {score}
                    </div>
                ) : null}
            </div>

            {currentQuestion < data.length ? (
                <div className={styles.imgContainer}>
                    <img src={data[currentQuestion].src} alt={`Animal ${data[currentQuestion].Id}`}/>
                    <div className={styles.buttonContainerWrapper}>
                        {renderOptions()}
                    </div>
                    <p className={`${styles.result} ${result === 'Oikein!' ? styles.correct : ''}`}>
                        {result}
                    </p>
                </div>
            ) : (
                <div>
                    <h2>Harjoitus valmis!</h2>
                    <p>Sait {score} pistettä / {data.length}.</p>
                </div>
            )}
        </div>
    );
}

export default Game4;
