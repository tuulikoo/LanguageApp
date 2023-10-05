import React, { useState } from 'react';
import Flashcard from './FlashcardComponent';
import styles from '../styles/flashcards.module.scss';

const FlashcardDeckComponent = ({ flashcards }) => {
    const [currentCard, setCurrentCard] = useState(0);

    const handleNext = () => {
        setCurrentCard((prevCard) => (prevCard + 1) % flashcards.length);
    };

    return (
        <div className={styles.flashcardDeck}>
            <Flashcard
                word={flashcards[currentCard].word}
                definition={flashcards[currentCard].definition}
                onNext={handleNext}
            />
        </div>
    );
};

export default FlashcardDeckComponent;
