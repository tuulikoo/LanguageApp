import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useUser } from "@/utils/userContext";
import { convertTextToSpeech } from "@/utils/mimicApi";
import styles from "../styles/Exec.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

const POINT_LEVELS = [
    { threshold: 10, key: "listening1.1" },
    { threshold: 20, key: "listening1.2" },
    { threshold: 30, key: "listening1.3" },
    { threshold: 40, key: "listening1.4" },
    { threshold: 50, key: "listening1.5" },
    { threshold: 60, key: "listening1.6" },
    { threshold: 70, key: "listening1.7" },
    { threshold: 80, key: "listening1.8" },
    { threshold: 90, key: "listening1.9" },
    { threshold: 100, key: "listening2.0" },
];

const getWordListKey = (points) => {
    for (let level of POINT_LEVELS) {
        if (points <= level.threshold) {
            return level.key;
        }
    }
};

const ExerciseComponent = () => {
    const { user } = useUser();
    const initialUserPoints = user ? user.userPoints : 0;
    const [userPointsState, setUserPointsState] = useState(initialUserPoints);

    // Determine the key for fetching the word list regardless of the user's login status
    const currentWordListKey = useMemo(
        () => getWordListKey(userPointsState),
        [userPointsState],
    );

    const [currentWordList, setCurrentWordList] = useState([]);
    const [inputWord, setInputWord] = useState("");
    const [, setAudioURL] = useState(null);
    const [result, setResult] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0); // Initialize to 0 initially
    const [isLoading, setIsLoading] = useState(false);
    const [showCorrect, setShowCorrect] = useState(false);
    const [remainingWords, setRemainingWords] = useState(currentWordList);

    const updateUserPoints = useCallback(async () => {
        const pointsToAdd = 1;
        setIsLoading(true);
        try {
            // Update user points regardless of whether the user is logged in or not
            const response = await fetch("/api/updatePoints", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user?.id, newPoints: pointsToAdd }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserPointsState(data.updatedPoints);
            } else {
                throw new Error("Failed to update points");
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
        setIsLoading(false);
    }, [user?.id]);

    const { t } = useTranslation();

    const playAudio = useCallback(async () => {
        console.log("Playing audio...");
        console.log("Current index:", currentIndex);
        console.log("Current word list:", currentWordList);

        if (currentWordList.length > 0) {
            // Check if currentIndex is valid
            if (currentIndex >= 0 && currentIndex < currentWordList.length) {
                const audioBlob = await convertTextToSpeech(
                    currentWordList[currentIndex],
                );
                const objectURL = URL.createObjectURL(audioBlob);
                setAudioURL(objectURL);
                new Audio(objectURL).play();
            } else {
                // If currentIndex is invalid, reset it to a valid index (e.g., 0)
                const newIndex = Math.max(
                    0,
                    Math.floor(Math.random() * currentWordList.length),
                );
                console.warn("Resetting index to a valid value:", newIndex);
                setCurrentIndex(newIndex);
            }
        } else {
            console.warn("Cannot play audio: Empty word list.");
        }
    }, [currentIndex, currentWordList]);

    const getNextWordIndex = useCallback(() => {
        if (remainingWords.length === 0) {
            setRemainingWords(currentWordList);
        }

        const randomIndex = Math.floor(Math.random() * remainingWords.length);
        const newWord = remainingWords[randomIndex];

        setRemainingWords((prevWords) =>
            prevWords.filter((word) => word !== newWord),
        );

        return currentWordList.indexOf(newWord);
    }, [currentWordList, remainingWords]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `/api/getWordsListening?category=${currentWordListKey}`,
                );
                if (response.ok) {
                    const words = await response.json();
                    console.log("Fetched words:", words); // Log the fetched words
                    setCurrentWordList(words);

                    // Set currentIndex after fetching the word list
                    const newIndex = Math.floor(Math.random() * words.length);
                    console.log("New index:", newIndex); // Log the new index
                    setCurrentIndex(newIndex); // Set currentIndex here
                } else {
                    throw new Error("Failed to fetch words.");
                }
            } catch (error) {
                console.error("Error fetching words:", error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userPointsState, currentWordListKey]);

    const setNextWord = useCallback(() => {
        const newIndex = getNextWordIndex();
        setCurrentIndex(newIndex);
    }, [getNextWordIndex]);

    const handleCorrectAnswer = useCallback(() => {
        setShowCorrect(true);
        setResult(null);
        setTimeout(() => {
            setShowCorrect(false);
            setInputWord("");
            setNextWord();
        }, 2000);
    }, [setNextWord]);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (
                inputWord.toLowerCase() === currentWordList[currentIndex].toLowerCase()
            ) {
                await updateUserPoints();
                handleCorrectAnswer();
            } else {
                setInputWord("");
                setResult(t("G2Wrong"));
            }
        },
        [
            inputWord,
            currentIndex,
            currentWordList,
            updateUserPoints,
            handleCorrectAnswer,
            t
        ],
    );

    return (
        <div className={styles.container}>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    {showCorrect ? (
                        <div className={styles.correctMessage}>{t("G2Correct")}</div>
                    ) : (
                        <>
                            <AudioButton onPlay={playAudio} t={t} />
                            <div
                                id="spoken-word"
                                data-spoken-word={currentWordList[currentIndex]}
                            ></div>
                            <ExerciseForm
                                inputWord={inputWord}
                                onInputChange={setInputWord}
                                onSubmit={handleSubmit}
                                t={t}
                            />
                            <ResultDisplay result={result} t={t} />
                            {currentIndex < currentWordList.length - 1 && (
                                <NextButton onNext={setNextWord} t={t} />
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

const AudioButton = ({ onPlay, t }) => (
    <button className={styles.audioButton} onClick={onPlay}>
        <img src="images/audio.png" alt={t("PlayAudio")} />
    </button>
);

const ExerciseForm = ({ inputWord, onInputChange, onSubmit, t }) => (
    <form onSubmit={onSubmit}>
        <input
            className={styles.input}
            value={inputWord}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={t("G2Placeholder")}
        />
        <button type="submit"></button>
    </form>
);

const ResultDisplay = ({ result, t }) =>
    result && (
        <p
            className={`${styles.result} ${result === t("G2Correct") ? styles.correct : styles.incorrect
                }`}
        >
            {result}
        </p>
    );

const NextButton = ({ onNext, t }) => (
    <button className={styles.nextButton} onClick={onNext}>
        {t("G2Next")}
    </button>
);

export default ExerciseComponent;
