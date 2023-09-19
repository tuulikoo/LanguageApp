import React, { useCallback, useMemo, useState } from 'react';
import { useUser } from '@/utils/userContext';
import listeningData from '../utils/wordlists/listeningData.json';
import { convertTextToSpeech } from '@/utils/mimicApi';
import styles from '../styles/Exec.module.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';

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

    const currentWordListKey = useMemo(() => getWordListKey(userPointsState), [userPointsState]);
    const currentWordList = useMemo(() => listeningData[currentWordListKey] || [], [currentWordListKey]);

    const [inputWord, setInputWord] = useState('');
    const [audioURL, setAudioURL] = useState(null);
    const [result, setResult] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * currentWordList.length));
    const [isLoading, setIsLoading] = useState(false);
    const [showCorrect, setShowCorrect] = useState(false);
    const [remainingWords, setRemainingWords] = useState(currentWordList);



    const updateUserPoints = useCallback(async () => {
        const pointsToAdd = 1;
        setIsLoading(true);
        try {
            const response = await fetch('/api/updatePoints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, newPoints: pointsToAdd })
            });

            if (response.ok) {
                const data = await response.json();
                setUserPointsState(data.updatedPoints);
            } else {
                throw new Error('Failed to update points');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
        setIsLoading(false);
    }, [user?.id]);

    const playAudio = useCallback(async () => {
        const audioBlob = await convertTextToSpeech(currentWordList[currentIndex]);
        const objectURL = URL.createObjectURL(audioBlob);
        setAudioURL(objectURL);
        new Audio(objectURL).play();
    }, [currentIndex, currentWordList]);

    useEffect(() => {
        setRemainingWords(currentWordList);
        if (user && user.userPoints) {
            setUserPointsState(user.userPoints);
        }
    }, [currentWordList, updateUserPoints, user]);

    const getNextWordIndex = useCallback(() => {
        if (remainingWords.length === 0) {
            setRemainingWords(currentWordList);
        }

        const randomIndex = Math.floor(Math.random() * remainingWords.length);
        const newWord = remainingWords[randomIndex];

        setRemainingWords(prevWords => prevWords.filter(word => word !== newWord));

        return currentWordList.indexOf(newWord);
    }, [remainingWords, currentWordList]);


    const setNextWord = useCallback(() => {
        const newIndex = getNextWordIndex();
        setCurrentIndex(newIndex);
    }, [getNextWordIndex]);

    const handleCorrectAnswer = useCallback(() => {
        setShowCorrect(true);
        setResult(null);
        setTimeout(() => {
            setShowCorrect(false);
            setInputWord('');
            setNextWord();
        }, 2000);
    }, [setNextWord]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (inputWord.toLowerCase() === currentWordList[currentIndex].toLowerCase()) {
            await updateUserPoints();
            handleCorrectAnswer();
        } else {
            setInputWord('');
            setResult('väärin, yritä uudelleen!');
        }
    }, [inputWord, currentIndex, currentWordList, updateUserPoints, handleCorrectAnswer]);
    return (
        <div className={styles.container}>
            {isLoading ? <CircularProgress /> :
                <>
                    {showCorrect ? <div className={styles.correctMessage}>Oikein!</div> :
                        <>
                            <AudioButton onPlay={playAudio} />
                            <ExerciseForm inputWord={inputWord} onInputChange={setInputWord} onSubmit={handleSubmit} />
                            <ResultDisplay result={result} />
                            {currentIndex < currentWordList.length - 1 && <NextButton onNext={setNextWord} />}
                        </>}
                </>}
        </div>
    );
};
const AudioButton = ({ onPlay }) => (
    <button className={styles.audioButton} onClick={onPlay}>
        <img src="images/audio.png" alt="Play Audio" />
    </button>
);

const ExerciseForm = ({ inputWord, onInputChange, onSubmit }) => (
    <form onSubmit={onSubmit}>
        <input
            className={styles.input}
            value={inputWord}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Kirjoita kuulemasi sana tähän"
        />
        <button type="submit"></button>
    </form>
);

const ResultDisplay = ({ result }) => (
    result && (
        <p className={`${styles.result} ${result === 'Oikein!' ? styles.correct : ''}`}>{result}</p>
    )
);

const NextButton = ({ onNext }) => <button className={styles.seuraavaButton} onClick={onNext}>Seuraava</button>;


export default ExerciseComponent;





