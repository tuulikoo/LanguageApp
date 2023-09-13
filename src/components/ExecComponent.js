import { useState } from 'react';
import { convertTextToSpeech } from '../utils/mimicApi';
import styles from '../styles/Exec.module.scss';

const ExerciseComponent = ({ correctWord }) => {
    const [inputWord, setInputWord] = useState('');
    const [audioURL, setAudioURL] = useState(null);
    const [result, setResult] = useState(null);

    const playAudio = async () => {
        try {
            const audioBlob = await convertTextToSpeech(correctWord);
            const objectURL = URL.createObjectURL(audioBlob);
            setAudioURL(objectURL);
            new Audio(objectURL).play();
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputWord.trim().toLowerCase() === correctWord.toLowerCase()) {
            setResult('Oikein!');
        } else {
            setResult('väärin, yritä uudelleen!');
        }
    };

    return (
        <div className={styles.container}>
            <button className={styles.audioButton} onClick={playAudio}>
                <img src="images/audio.png" alt="Play Audio" />
            </button>
            <form onSubmit={handleSubmit}>
                <input className={styles.input}
                    value={inputWord}
                    onChange={(e) => setInputWord(e.target.value)}
                    placeholder="Kirjoita kuulemasi sana tähän"
                />
                <button className={styles.submitButton} type="submit">
                </button>
            </form>
            {result && <p className={`${styles.result} ${result === 'Correct!' ? styles.correct : ''}`}>{result}</p>}
        </div>
    );
};

export default ExerciseComponent;
