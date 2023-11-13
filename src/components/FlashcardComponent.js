import React, { useState } from 'react';
import styles from '../styles/flashcards.module.css'; // Import the CSS module

const Flashcard = ({ word, definition, onNext }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={styles.flashcard}>
            <div
                className={`${styles.card} ${isFlipped ? styles.flipped : ''}`} // Use CSS module class names
                onClick={handleFlip}
            >
                <h3>{isFlipped ? definition : word}</h3>
            </div>
            <div className={styles.arrow} onClick={() => { setIsFlipped(false); onNext(); }}>
                →
            </div>
        </div>
    );
};

export default Flashcard;