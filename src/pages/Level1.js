import { useState, useEffect } from 'react';
import Flashcard from '@/components/FlashcardComponent';
import styles from '../styles/level1.module.css';

function Level1() {
    const [words, setWords] = useState([]);

    useEffect(() => {
        fetch('/path/to/words.json')
            .then(response => response.json())
            .then(data => setWords(data));
    }, []);

    return (
        <div className={styles.container}>
            {words.map((word, index) => (
                <Flashcard key={index} word={word} />
            ))}
        </div>
    );
}

export default Level1;

