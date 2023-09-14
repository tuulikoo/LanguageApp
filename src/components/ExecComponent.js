import React, { useState, useCallback, useEffect, useRef,useMemo } from 'react';
import { useUser } from '../utils/userContext';
import wordList from '../utils/wordlists/wordList.json';
import { convertTextToSpeech } from '../utils/mimicApi';
import styles from '../styles/Exec.module.scss';
import debounce from 'lodash.debounce';

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
    return POINT_LEVELS[POINT_LEVELS.length - 1].key; 
};


const SYNC_INTERVAL = 3000;

const ExerciseComponent = () => {
    const { user, refetchUser } = useUser(); 
    const userPoints = user ? user.userPoints : 0;
    const [localPoints, setLocalPoints] = useState(0);
    const totalPoints = userPoints + localPoints;

    const currentWordList = useMemo(() => {
        const key = getWordListKey(totalPoints);
        return wordList[key] || [];
    }, [totalPoints]);

    const [inputWord, setInputWord] = useState('');
    const [result, setResult] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * currentWordList.length));

    useEffect(() => {
        const initialPoints = parseInt(localStorage.getItem('accumulatedPoints'), 10) || 0;
        setLocalPoints(initialPoints);
    }, []);

    const updateUserPoints = useCallback(async () => {
        if (!user?.id) return;
        const newTotalPoints = userPoints + localPoints;

        try {
            const response = await fetch('/api/updatePoints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, newPoints: localPoints })
            });

            const responseData = await response.json();
            
            if (response.ok) {
                if (responseData.updatedTotalPoints !== newTotalPoints) {
                    refetchUser();
                }
                localStorage.setItem('accumulatedPoints', '0');
                setLocalPoints(0);
            } else {
                console.error('Server responded with a non-ok status when updating points.');
            }

        } catch (error) {
            console.error('Error:', error.message);
        }
    }, [user, localPoints, refetchUser, userPoints]);

    const debouncedUpdateUserPoints = useMemo(() => {
        return debounce(updateUserPoints, SYNC_INTERVAL);
    }, [updateUserPoints]);

    const handleCorrectAnswer = useCallback(() => {
        setLocalPoints(prev => {
            const updatedPoints = prev + 1;
            localStorage.setItem('accumulatedPoints', updatedPoints.toString());
            debouncedUpdateUserPoints();
            return updatedPoints;
        });
    }, [debouncedUpdateUserPoints]);

    const playAudio = useCallback(async () => {
        const audioBlob = await convertTextToSpeech(currentWordList[currentIndex]);
        const objectURL = URL.createObjectURL(audioBlob);
        new Audio(objectURL).play();
    }, [currentIndex, currentWordList]);

 
const handleSubmit = useCallback((e) => {
        e.preventDefault();

        const currentWord = currentWordList[currentIndex];
        if (!currentWord) return;  // Guard clause to handle out-of-bounds index

        if (inputWord.toLowerCase() === currentWord.toLowerCase()) {
            handleCorrectAnswer();
            setInputWord('');
            setResult('Oikein!');
            setCurrentIndex(prev => (prev + 1) % currentWordList.length);
        } else {
            setInputWord('');
            setResult('väärin, yritä uudelleen!');
        }
    }, [inputWord, currentWordList, handleCorrectAnswer]);
    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % currentWordList.length);
    }, [currentWordList]);

  return (
        <div className={styles.container}>
            <AudioButton onPlay={playAudio} />
            <ExerciseForm 
                inputWord={inputWord} 
                onInputChange={setInputWord} 
                onSubmit={handleSubmit} 
            />
            <ResultDisplay result={result} />
            <NextButton onNext={() => setCurrentIndex(prev => (prev + 1) % currentWordList.length)} />
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




