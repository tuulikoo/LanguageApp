import { useState } from 'react';
import styles from './FlashcardComponent.module.css';

function Flashcard({ word }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className={styles.card} onClick={() => setFlipped(!flipped)}>
            {flipped ? word.finnish : word.english}
        </div>
    );
}

export default Flashcard;
