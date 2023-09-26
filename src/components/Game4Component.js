import React, { useEffect, useState } from 'react';
import Game2Component from './Game2Component'; // Import Game2Component
import game4 from '../utils/wordlists/game4.json';
import { useUser } from '../utils/userContext';
import styles from '../styles/Game4Component.module.scss';
import { textToSpeech } from '../utils/mimicApi';

function Game4Component() {
    const { user } = useUser();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(null);
    const [currentUserPoints, setCurrentUserPoints] = useState(0);
    const [incorrectAttempts, setIncorrectAttempts] = useState(0);
    const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false);
    const [sectionCompleted, setSectionCompleted] = useState(false); // Track section completion

    const section = user ? user.lastLevel : "1"; // Default to "1.1" if lastLevel is not set
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
                            body: JSON.stringify({
                                userId: user.id,
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
                    }
                }
            }
        }
    }, [currentQuestion, data, user, questionsPerSection]);

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
                    {!user ? (
                        <div>Pisteet: {score}</div>
                    ) : null}
                </div>
            </div>

            {sectionCompleted ? (
                <Game2Component />
            ) : (
                <div className={styles.gameContainer}>
                    <img
                        className={styles.speakButton}
                        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjJweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMjIgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOC43MjI0NDksMTQuODQwMDM5OCBDMTguOTk5MDMwNiwxNS4wMjY4ODE2IDE5LjM2NTMwNjEsMTQuOTUyMTQxOCAxOS41ODIwNDA4LDE0LjY0NTcyODUgQzIwLjk2NDY0MjksMTIuNjk1MDkxOCAyMS43NDkzODc4LDEwLjE2ODk3ODUgMjEuNzQ5Mzg3OCw3LjUwMDg3NjQ5IEMyMS43NDkzODc4LDQuODMyNzc0NDUgMjAuOTQyMTQyOSwyLjMxNDEzNjY5IDE5LjU4MjA0MDgsMC4zNTYwMjQ0NDggQzE5LjM2NTMwNjEsMC4wNDIxMjY0ODg2IDE4Ljk5OTAzMDYsLTAuMDMyNjEzMzA3MyAxOC43MjI0NDksMC4xNjE3MTMyMjMgQzE4LjQzODUyMDQsMC4zNjM0OTM4MzYgMTguMzkzNjczNSwwLjcyOTcwODEyMSAxOC42MTA0MDgyLDEuMDQzNjA2MDggQzE5LjgxMzYyMjQsMi44MTQ4NzY0OSAyMC41NjEwMjA0LDUuMDg2ODcxMzkgMjAuNTYxMDIwNCw3LjUwMDg3NjQ5IEMyMC41NjEwMjA0LDkuOTE0ODgxNTkgMTkuODQzNjIyNCwxMi4yMjQyNDk0IDE4LjYxMDQwODIsMTMuOTU4MTQ1NCBDMTguMzkzNjczNSwxNC4yNzIwNDE4IDE4LjQzODUyMDQsMTQuNjM4MjU5MSAxOC43MjI0NDksMTQuODQwMDM5OCBaIE04LjYzMzAwNTEsMTQuMzYxNzI1IEM5LjE0MTIxNDI5LDE0LjM2MTcyNSA5LjUwNzQyODU3LDEzLjk4ODA0MTMgOS41MDc0Mjg1NywxMy40ODczMDMgTDkuNTA3NDI4NTcsMS41NjY3NjkzNSBDOS41MDc0Mjg1NywxLjA2NjAyOTU1IDkuMTQxMjE0MjksMC42NTQ5NjgzMjUgOC42MTgwNjYzMywwLjY1NDk2ODMyNSBDOC4yNTE4NTIwNCwwLjY1NDk2ODMyNSA4LjAwNTIyNDQ5LDAuODExOTE3MzA1IDcuNjA5MTE3MzUsMS4xODU2MDA5OCBMNC4yOTgyNjUzMSw0LjMwMjE0MTc5IEM0LjI0NTk0ODk4LDQuMzQ2OTczNDMgNC4xODYxNjMyNyw0LjM2OTM5NjkgNC4xMTE0MjM0Nyw0LjM2OTM5NjkgTDEuODc2NzkwODIsNC4zNjkzOTY5IEMwLjgyMjk5NDg5OCw0LjM2OTM5NjkgMC4yNTUsNC45NDQ4NzY0OSAwLjI1NSw2LjA3MzM5NjkgTDAuMjU1LDguOTY1NzE4MzMgQzAuMjU1LDEwLjA4Njc2OTMgMC44MjI5OTQ4OTgsMTAuNjYyMjQ4OSAxLjg3Njc5MDgyLDEwLjY2MjI0ODkgTDQuMTExNDIzNDcsMTAuNjYyMjQ4OSBDNC4xODYxNjMyNywxMC42NjIyNDg5IDQuMjQ1OTQ4OTgsMTAuNjg0NjcyNCA0LjI5ODI2NTMxLDEwLjcyOTUwNCBMNy42MDkxMTczNSwxMy44NzU5MzQ3IEM3Ljk2Nzg0Njk0LDE0LjIxMjI1MTUgOC4yNjY4MDYxMiwxNC4zNjE3MjUgOC42MzMwMDUxLDE0LjM2MTcyNSBaIE0xNS43MTA2NjMzLDEyLjc5OTcyMzUgQzE2LjAwMjA5MTgsMTIuOTk0MDM5NyAxNi4zNjA4NjczLDEyLjkxOTMwMjYgMTYuNTcwMTAyLDEyLjYyMDM1NTEgQzE3LjU1NjU4MTYsMTEuMjQ1MTk3OSAxOC4xMzIwOTE4LDkuNDE0MTQxNzkgMTguMTMyMDkxOCw3LjUwMDg3NjQ5IEMxOC4xMzIwOTE4LDUuNTgwMTQxNzkgMTcuNTcxNTgxNiwzLjc0MTYwMDk4IDE2LjU3MDEwMiwyLjM3MzkyMjQxIEMxNi4zNTMzNjczLDIuMDgyNDQ3OTIgMTYuMDAyMDkxOCwyLjAwNzcwODEyIDE1LjcxMDY2MzMsMi4yMDIwMzQ2NSBDMTUuNDI2NTgxNiwyLjM5NjM0NTg4IDE1LjM4MTczNDcsMi43NjI1NjAxNiAxNS42MDU5Njk0LDMuMDgzOTI3NTEgQzE2LjQyMDU2MTIsNC4yNzk3MTgzMyAxNi45Mjg4Nzc2LDUuODQ5MTkyODIgMTYuOTI4ODc3Niw3LjUwMDg3NjQ5IEMxNi45Mjg4Nzc2LDkuMTUyNTYwMTYgMTYuNDI4MDYxMiwxMC43MzY5ODg3IDE1LjYwNTk2OTQsMTEuOTE3ODI4NSBDMTUuMzg5MjM0NywxMi4yMzkxOTU5IDE1LjQyNjU4MTYsMTIuNjA1NDA3MSAxNS43MTA2NjMzLDEyLjc5OTcyMzUgWiBNMTIuNzI4NTg2NywxMC43ODE4MjA0IEMxMi45ODI2OTksMTAuOTYxMTkyOCAxMy4zNDg5MTMzLDEwLjkwODg3NjUgMTMuNTY1NjQ4LDEwLjYwOTkzMjYgQzE0LjE0ODUyMDQsOS44MjUxODc3MSAxNC40OTk3OTU5LDguNjc0MjQzODQgMTQuNDk5Nzk1OSw3LjUwMDg3NjQ5IEMxNC40OTk3OTU5LDYuMzI3NTA5MTQgMTQuMTQ4NTIwNCw1LjE4NDAzNDY1IDEzLjU2NTY0OCw0LjM5MTgyMDM3IEMxMy4zNDg5MTMzLDQuMDkyODc2NDkgMTIuOTkwMTY4NCw0LjA0MDU2MDE2IDEyLjcyODU4NjcsNC4yMTI0NDc5MiBDMTIuNDA3MjE5NCw0LjQzNjY2NzMgMTIuMzYyMzg3OCw0LjgxNzgyMDM3IDEyLjYwMTU0NTksNS4xMzkxODc3MSBDMTMuMDM1MDE1Myw1LjcyMjEzNjY5IDEzLjI5NjU5NjksNi42MTE0OTg5NCAxMy4yOTY1OTY5LDcuNTAwODc2NDkgQzEzLjI5NjU5NjksOC4zOTAyMzg3MyAxMy4wMjAwNjEyLDkuMjc5NjE2MjggMTIuNTk0MDYxMiw5Ljg3MDAzNDY1IEMxMi4zNjk4NTcxLDEwLjE5MTQwMiAxMi40MDcyMTk0LDEwLjU1NzYxNjMgMTIuNzI4NTg2NywxMC43ODE4MjA0IFoiLz4KPC9zdmc+"
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
            )}
        </div>
    );
}

export default Game4Component;