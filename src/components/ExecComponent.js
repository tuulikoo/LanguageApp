import { useState, useEffect } from 'react';
import { convertTextToSpeech } from '../utils/mimicApi';
import styles from '../styles/Exec.module.scss';
import { useUser } from '../utils/userContext';
import wordList from '../utils/wordlists/wordList.json';

const ExerciseComponent = () => {
    const { user } = useUser();
    const initialUserPoints = user ? user.userPoints : 0;
    const userPoints = user ? user.userPoints : 0;
    const [inputWord, setInputWord] = useState('');
    const [audioURL, setAudioURL] = useState(null);
    const [result, setResult] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentWordListKey = getWordListForPoints(userPoints);
    const currentWordList = wordList[currentWordListKey] || [];
    const [currentUserPoints, setCurrentUserPoints] = useState(initialUserPoints);




    const playAudio = async () => {
        try {
            const audioBlob = await convertTextToSpeech(currentWordList[currentIndex]);
            const objectURL = URL.createObjectURL(audioBlob);
            setAudioURL(objectURL);
            new Audio(objectURL).play();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (inputWord.trim().toLowerCase() === currentWordList[currentIndex].toLowerCase()) {
            setResult('Oikein!');
            setCurrentIndex(prevIndex => prevIndex + 1);
            updateUserPoints();
        } else {
            setResult('väärin, yritä uudelleen!');
        }

        setInputWord('');
    };

    const updateUserPoints = async () => {
        const newPoints = currentUserPoints + 1;
        try {
            const response = await fetch('/api/updatePoints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, newPoints })
            });

            if (response.ok) {
                const data = await response.json();
                setCurrentUserPoints(data.updatedPoints);  // Use the updater function here
            } else {
                throw new Error('Failed to update points');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className={styles.container}>
            <AudioButton onPlay={playAudio} />
            <ExerciseForm inputWord={inputWord} onInputChange={setInputWord} onSubmit={handleSubmit} />
            <ResultDisplay result={result} />
            <NextButton currentIndex={currentIndex} wordListLength={currentWordList.length} onNext={() => setCurrentIndex(prevIndex => prevIndex + 1)} />
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

const NextButton = ({ currentIndex, wordListLength, onNext }) => (
    currentIndex < wordListLength - 1 && (
        <button onClick={onNext}>Seuraava</button>
    )
);

function getWordListForPoints(points) {
    if (points < 19) return "listening1.1";
    if (points > 40) return "listening1.2";
    return "listening2.0";
}

export default ExerciseComponent;





