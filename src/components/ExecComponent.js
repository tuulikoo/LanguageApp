import { useState } from 'react';
import { convertTextToSpeech } from '../utils/mimicApi';
import styles from '../styles/Exec.module.scss';

const ExerciseComponent = ({ wordList }) => {
    const [inputWord, setInputWord] = useState('');
    const [audioURL, setAudioURL] = useState(null);
    const [result, setResult] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const playAudio = async () => {
        try {
            const audioBlob = await convertTextToSpeech(wordList[currentIndex]);
            const objectURL = URL.createObjectURL(audioBlob);
            setAudioURL(objectURL);
            new Audio(objectURL).play();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputWord.trim().toLowerCase() === wordList[currentIndex].toLowerCase()) {
            setResult('Oikein!');
            setCurrentIndex(prevIndex + 1);
        } else {
            setResult('väärin, yritä uudelleen!');
        }
        setInputWord('');
    };

    const handleNext = () => {
        if (currentIndex < wordList.length - 1) {
            setCurrentIndex(prevIndex => prevIndex + 1);
            setInputWord('');
            setResult(null);
        }
    };

    return (
        <div className={styles.container}>
            <button className={styles.audioButton} onClick={playAudio}>
                <img src="images/audio.png" alt="Play Audio" />
            </button>
            <form onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    value={inputWord}
                    onChange={(e) => setInputWord(e.target.value)}
                    placeholder="Kirjoita kuulemasi sana tähän"
                />
                <button className={styles.submitButton} type="submit"></button>
            </form>
            {result && (
                <p className={`${styles.result} ${result === 'Oikein!' ? styles.correct : ''}`}>{result}</p>
            )}
            <button onClick={handleNext}>Seuraava</button>
        </div>
    );
};

export default ExerciseComponent;

