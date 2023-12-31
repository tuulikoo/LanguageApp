import React, { useEffect, useState } from "react";
import game4 from "../utils/wordlists/game4.json";
import { useUser } from "../utils/userContext";
import styles from "../styles/Game4Component.module.scss";
import { textToSpeech } from "../utils/mimicApi";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
/**
 * Game4Component is a language learning game component that presents users with questions and options.
 * Users can listen to the pronunciation of words, select answers, and navigate through questions.
 * It tracks user's score, updates user points, and handles navigation back to the main page or previous questions.
 *
 * @component
 * @example
 * return (
 *   <Game4Component />
 * )
 *
 * @returns {React.ReactElement} A React component that renders an interactive language learning game.
 * It displays images, plays audio for words, presents multiple choice questions, and provides
 * feedback on user's answers. Additionally, it manages user's progress through different levels and sections.
 */

function Game4Component() {
    // Pass onLevelCompletion as a prop
    const { t } = useTranslation();
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
    const selectedLanguage = Cookies.get("selectedLanguage");
    const router = useRouter();

    useEffect(() => {
        if (user) {
            async function fetchUserPoints() {
                try {
                    const response = await fetch("/api/user");
                    if (response.ok) {
                        const data = await response.json();
                        console.log("User data:", data);
                        setCurrentUserPoints(data.userPoints);
                    } else {
                        throw new Error("Failed to fetch user points");
                    }
                } catch (error) {
                    console.error("Error:", error.message);
                }
            }

            fetchUserPoints();
        }
    }, [user]);

    useEffect(() => {
        if (currentQuestion >= data?.length) {
            if (user) {
                if (user.lastLevel < 6) {
                    const nextLevel = user.lastLevel + 1;

                    // Check if it's time to increment lastLevel
                    if (
                        (nextLevel - 1) * questionsPerSection >=
                        currentQuestion
                    ) {
                        fetch("/api/updateUser", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
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
                                console.error(
                                    "Error updating lastLevel:",
                                    error
                                );
                            });
                        // Todo: Call the onLevelCompletion function to signal level completion
                    }
                } else {
                    const nextLevel = 1;

                    // Check if it's time to increment lastLevel
                    {
                        fetch("/api/updateUser", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
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
                                console.error(
                                    "Error updating lastLevel:",
                                    error
                                );
                            });
                        // Todo: Call the onLevelCompletion function to signal level completion
                    }
                }
            }
        }
    }, [currentQuestion, data, user, questionsPerSection]);

    const handleOptionClick = async (option) => {
        if (
            !hasAnsweredCorrectly &&
            option === data[currentQuestion].correctOption
        ) {
            setScore(score + 1);
            setResult(t("G4correct"));
            setHasAnsweredCorrectly(true);
            if (user) {
                try {
                    const response = await fetch("/api/updatePoints", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
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
                        throw new Error("Failed to update user points");
                    }
                } catch (error) {
                    console.error("Error updating user points:", error);
                }
            }

            setTimeout(() => {
                handleNextQuestion();
            }, 700);
        } else {
            if (incorrectAttempts === 0) {
                setResult(t("G4wrong"));
            } else {
                setResult(
                    t("G4wrong2", {
                        correctOption: data[currentQuestion].correctOption,
                    })
                );

                setTimeout(() => {
                    handleNextQuestion();
                }, 1000);
            }
            setIncorrectAttempts(incorrectAttempts + 1);
        }
    };

    const handleNextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setResult("");
        setIncorrectAttempts(0);
        setHasAnsweredCorrectly(false);

        if (currentQuestion + 1 >= data?.length) {
            if (user) {
                // Check if user.lastLevel is a number
                if (typeof user.lastLevel === "number") {
                    const nextSectionNumber = user.lastLevel + 1;
                    const newLastLevel = nextSectionNumber - 1;

                    // If the section is completed, set the state variable
                    if (
                        (nextSectionNumber - 1) * questionsPerSection >=
                        currentQuestion
                    ) {
                        setSectionCompleted(true);
                    }

                    fetch("/api/updateUser", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId: user.id,
                            lastLevel: newLastLevel, // Update the user's last level correctly
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            // Handle the response, if needed
                        })
                        .catch((error) => {
                            console.error("Error updating lastLevel:", error);
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
        const options = ["btn1", "btn2", "btn3", "btn4"];
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

    const handleBackToMainPage = () => {
        router.push("/MainPage"); // Replace '/MainPage' with the actual URL of your MainPage
    };

    const handleBackToPreviousQuestion = () => {
        // Navigate the user back to the previous question
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleNextSet = () => {
        if (!data || !data.length) {
            router.push("/MainPage");
        } else {
            window.location.reload();
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.textContainer}>
                {currentQuestion < (data.length || 0) && (
                    <h1 className={`font-custom`}>{t("G4pick")}</h1>
                )}
            </div>
            <div className={styles.gameContainer}>
                {currentQuestion < (data.length || 0) ? (
                    <>
                        <div className={styles.centeredContainer}>
                            <img
                                className={styles.speakButton}
                                src="/images/audio.png"
                                alt="Speaker Button"
                                onClick={handleSpeakButtonClick}
                            />
                            <h2>{t("G4listen")}</h2>
                        </div>
                        <div className={styles.imgContainer}>
                            <div className={styles.imgWrapper}>
                                <div className={styles.centeredContainer}>
                                    <img
                                        src={data[currentQuestion]?.src}
                                        alt={`Image ${data[currentQuestion]?.Id}`}
                                    />
                                </div>
                                <div className={styles.buttonContainerWrapper}>
                                    {renderOptions()}
                                </div>
                            </div>
                            <p
                                className={`${styles.result} ${
                                    result === "Oikein!" ||
                                    result === "その通りだ！!" ||
                                    result === "Korrekt!"
                                        ? styles.correct
                                        : ""
                                }`}
                            >
                                {result}
                            </p>
                        </div>
                    </>
                ) : (
                    <div className={styles.harjoitusValmis}>
                        <h2 className={`font-custom`}>{t("G4ready")}</h2>
                        <p className={`font-custom`}>
                            {t("G4scored")} {score}/{data.length || 0}
                        </p>
                        <button
                            onClick={handleNextSet}
                            style={{
                                maxWidth: "200px",
                                padding: "10px 20px",
                                fontSize: "16px",
                            }}
                        >
                            <img
                                src="https://cdn.pixabay.com/photo/2017/01/29/22/16/cycle-2019530_640.png"
                                alt="Continue to next set"
                            />
                        </button>
                    </div>
                )}
                {sectionCompleted && (
                    <div className={styles.pointsDisplay}>
                        {user ? (
                            <div className={`font-custom`}>
                                {t("G4totalPoints")} {currentUserPoints}
                            </div>
                        ) : null}
                        {user ? (
                            <div className={`font-custom`}>
                                {t("G4atLevel")} {user.lastLevel}
                            </div>
                        ) : null}
                        {user ? (
                            <div className={`font-custom`}>
                                {t("G4score2")} {score}
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
            <div className={styles.backArrows}>
                <button
                    className={styles.backToMain}
                    onClick={handleBackToMainPage}
                    data-tooltip={t("G4backHome")}
                >
                    <img
                        src="https://cdn.pixabay.com/photo/2012/04/02/16/10/arrow-24848_640.png"
                        alt="Back to MainPage"
                    />
                </button>
                <button
                    onClick={handleBackToPreviousQuestion}
                    data-tooltip={t("G4previous")}
                    className={styles.backToPrevious}
                >
                    <img
                        src="https://cdn.pixabay.com/photo/2012/04/01/12/48/arrow-23284_640.png"
                        alt="Back to Previous Question"
                    />
                </button>
            </div>
        </div>
    );
}

export default Game4Component;
