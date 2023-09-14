import React, { useState, useCallback, useMemo } from 'react';
import { useUser } from '../utils/userContext';
import wordList from '../utils/wordlists/wordList.json';
import { convertTextToSpeech } from '../utils/mimicApi';
import styles from '../styles/Exec.module.scss';


const getWordListKey = (points) => {
    if (points <= 10) return "listening1.1";
    if (points <= 20) return "listening1.2";
    if (points <= 30) return "listening1.3";
    if (points <= 40) return "listening1.4";
    if (points <= 50) return "listening1.5";
    if (points <= 60) return "listening1.6";
    if (points <= 70) return "listening1.7";
    if (points <= 80) return "listening1.8";
    if (points <= 90) return "listening1.9";
    if (points <= 100) return "listening2.0";
};

const ExerciseComponent = () => {
    const { user } = useUser();
    const userPoints = user ? user.userPoints : 0;
    const currentWordListKey = useMemo(() => getWordListKey(userPoints), [userPoints]);
    const currentWordList = useMemo(() => wordList[currentWordListKey] || [], [currentWordListKey]);

    const [state, setState] = useState({
        inputWord: '',
        audioURL: null,
        result: null,
        currentIndex: Math.floor(Math.random() * currentWordList.length),
        userPoints: userPoints
    });

    const updateUserPoints = useCallback(async () => {
        const newPoints = state.userPoints + 1;
        try {
            const response = await fetch('/api/updatePoints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, newPoints })
            });

            if (response.ok) {
                const data = await response.json();
                setState(prev => ({ ...prev, userPoints: data.updatedPoints }));
            } else {
                throw new Error('Failed to update points');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }, [state.userPoints, user?.id]);

    const playAudio = useCallback(async () => {
        const audioBlob = await convertTextToSpeech(currentWordList[state.currentIndex]);
        const objectURL = URL.createObjectURL(audioBlob);
        setState(prev => ({ ...prev, audioURL: objectURL }));
        new Audio(objectURL).play();
    }, [state.currentIndex, currentWordList]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (state.inputWord.toLowerCase() === currentWordList[state.currentIndex].toLowerCase()) {
            await updateUserPoints();
            setState(prev => ({
                ...prev,
                result: 'Oikein!',
                currentIndex: Math.floor(Math.random() * currentWordList.length),
                inputWord: ''
            }));
        } else {
            setState(prev => ({ ...prev, result: 'väärin, yritä uudelleen!', inputWord: '' }));
        }
    }, [state.inputWord, state.currentIndex, currentWordList, updateUserPoints]);

    return (
        <div className={styles.container}>
            <AudioButton onPlay={playAudio} />
            <ExerciseForm inputWord={state.inputWord} onInputChange={(val) => setState(prev => ({ ...prev, inputWord: val }))} onSubmit={handleSubmit} />
            <ResultDisplay result={state.result} />
            {state.currentIndex < currentWordList.length - 1 && <NextButton onNext={() => setState(prev => ({ ...prev, currentIndex: Math.floor(Math.random() * currentWordList.length) }))} />}
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





