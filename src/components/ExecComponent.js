import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useUser } from '../utils/userContext';
import wordList from '../utils/wordlists/wordList.json';
import { convertTextToSpeech } from '../utils/mimicApi';
import styles from '../styles/Exec.module.scss';
import { useMemo } from 'react';

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
    const currentWordList = useMemo(() => wordList[currentWordListKey] || [], [currentWordListKey]);

    const [inputWord, setInputWord] = useState('');
    const [audioURL, setAudioURL] = useState(null);
    const [result, setResult] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * currentWordList.length));

    const updateUserPoints = useCallback(async () => {
        const pointsToAdd = 1;
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
    }, [user?.id]);
    const playAudio = useCallback(async () => {
        const audioBlob = await convertTextToSpeech(currentWordList[currentIndex]);
        const objectURL = URL.createObjectURL(audioBlob);
        setAudioURL(objectURL);
        new Audio(objectURL).play();
    }, [currentIndex, currentWordList]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (inputWord.toLowerCase() === currentWordList[currentIndex].toLowerCase()) {
            await updateUserPoints();
            setInputWord('');
            setResult('Oikein!');
            setCurrentIndex(Math.floor(Math.random() * currentWordList.length));
        } else {
            setInputWord('');
            setResult('väärin, yritä uudelleen!');
        }
    }, [inputWord, currentIndex, currentWordList, updateUserPoints]);

    return (
        <div className={styles.container}>
            <AudioButton onPlay={playAudio} />
            <ExerciseForm inputWord={inputWord} onInputChange={setInputWord} onSubmit={handleSubmit} />
            <ResultDisplay result={result} />
            {currentIndex < currentWordList.length - 1 && <NextButton onNext={() => setCurrentIndex(Math.floor(Math.random() * currentWordList.length))} />}
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
        <button className={styles.submitButton} type="submit"></button>
    </form>
);

const ResultDisplay = ({ result }) => (
    result && (
        <p className={`${styles.result} ${result === 'Oikein!' ? styles.correct : ''}`}>{result}</p>
    )
);

const NextButton = ({ onNext }) => <button onClick={onNext}>Seuraava</button>;

export default ExerciseComponent;





