import React, { useEffect, useState } from 'react';
import game4 from '../utils/wordlists/game4.json';
import { useUser } from '../utils/userContext';
import styles from '../styles/Game4Component.module.scss';
import { textToSpeech } from '../utils/mimicApi';


function Game4Component({ onLevelCompletion }) { // Pass onLevelCompletion as a prop
    const { user } = useUser();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(null);
    const [currentUserPoints, setCurrentUserPoints] = useState(0);
    const [incorrectAttempts, setIncorrectAttempts] = useState(0);
    const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false);
    const [sectionCompleted, setSectionCompleted] = useState(false); // Added this line

    const section = user ? user.lastLevel : "1";
    const data = game4[section];
    const questionsPerSection = 10;

    useEffect(() => {
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

    useEffect(() => {
        if (currentQuestion >= data?.length) {
            if (user) {
                if (user.lastLevel) {
                    const nextLevel = user.lastLevel + 1;

                    // Check if it's time to increment lastLevel
                    if ((nextLevel - 1) * questionsPerSection >= currentQuestion) {
                        fetch('/api/updateUser', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ userId: user.id,
                                lastLevel: nextLevel,
                            }),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                // Handle the response, if needed
                            })
                            .catch((error) => {
                                console.error('Error updating lastLevel:', error);
                            });
                        // Call the onLevelCompletion function to signal level completion
                        onLevelCompletion();
                    }
                }
            }
        }
    }, [currentQuestion, data, user, questionsPerSection, onLevelCompletion]);

    const handleOptionClick = async (option) => {
        if (!hasAnsweredCorrectly && option === data[currentQuestion].correctOption) {
            setScore(score + 1);
            setResult('Oikein!');
            setHasAnsweredCorrectly(true);

            if (user) {
                try {
                    const response = await fetch('/api/updatePoints', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: user.id,
                            newPoints: 1,
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
            if (incorrectAttempts === 0) {
                setResult('Väärin, yritä uudelleen!');
            } else {
                setResult(`Vastasit väärin, oikea vastaus oli ${data[currentQuestion].correctOption}`);
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
        setIncorrectAttempts(0);
        setHasAnsweredCorrectly(false);

        if (currentQuestion + 1 >= data?.length) {
            if (user) {
                // Check if user.lastLevel is a number
                if (typeof user.lastLevel === 'number') {
                    const nextSectionNumber = user.lastLevel + 1;
                    const newLastLevel = nextSectionNumber;

                    // If the section is completed, set the state variable
                    if ((nextSectionNumber - 1) * questionsPerSection >= currentQuestion) {
                        setSectionCompleted(true);
                    }

                    fetch('/api/updateUser', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: user.id,
                            lastLevel: 1,
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            // Handle the response, if needed
                        })
                        .catch((error) => {
                            console.error('Error updating lastLevel:', error);
                        });
                }
            }
        }
    };

    const handleSpeakButtonClick = () => {
        // Speak the correct word using the textToSpeech function
        textToSpeech(data[currentQuestion].correctOption);
    };

    const renderOptions = () => {
        const options = ['btn1', 'btn2', 'btn3', 'btn4'];
        return options.map((option, index) => (
            <button
                className={styles.buttonStyle}
                key={index}
                onClick={() => handleOptionClick(data[currentQuestion][option])}
            >
                {data[currentQuestion][option]}
            </button>
        ));
    };

    useEffect(() => {
        if (currentQuestion >= (data?.length || 0)) {
            // Handle what happens at the end of the game
        }
    }, [currentQuestion, data]);

    const updatePointsAndUI = (newPoints) => {
        setCurrentUserPoints(newPoints);
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.textContainer}>
                <h1>Valitse oikea sana</h1>
                <div className={styles.pointsDisplay}>
                    {user ? (
                        <div>Kokonaispisteesi: {currentUserPoints}</div>
                    ) : null}
                    {user ? (
                        <div>Olet tehtävätasolla: {user.lastLevel}</div>
                    ) : null}
                    {user ? (
                        <div>Tämän tehtävän pisteet: {score}</div>
                    ) : null}
                </div>
            </div>
            <div className={styles.gameContainer}>
                <img
                    className={styles.speakButton}
                    src='/images/audio.png'
                    alt="Speaker Button"
                    onClick={handleSpeakButtonClick}
                />
                {currentQuestion < (data.length || 0) ? (
                    <div className={styles.imgContainer}>
                        <div className={styles.imgWrapper}>
                            <img
                                src={data[currentQuestion]?.src}
                                alt={`Animal ${data[currentQuestion]?.Id}`}
                            />
                            <div className={styles.buttonContainerWrapper}>
                                {renderOptions()}
                            </div>
                        </div>
                        <p className={`${styles.result} ${result === 'Oikein!' ? styles.correct : ''}`}>
                            {result}
                        </p>
                    </div>
                ) : (
                    <div>
                        <h2>Harjoitus valmis!</h2>
                        <p>Sait {score} pistettä / {(data.length || 0)}.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Game4Component;