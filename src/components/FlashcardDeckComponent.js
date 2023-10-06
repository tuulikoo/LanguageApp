import React, { useState } from 'react';
import Flashcard from './FlashcardComponent';
import styles from '../styles/flashcards.module.css';
import {textToSpeech} from "@/utils/mimicApi"; // Import the CSS module

const FlashcardDeckComponent = ({ flashcards }) => {
    const [currentCard, setCurrentCard] = useState(0);

    const handleNext = () => {
        setCurrentCard((prevCard) => (prevCard + 1) % flashcards.length);
    };

    const handleSpeakButtonClick = () => {
        textToSpeech(flashcards[currentCard].word);
    };

    return (
        <div className={styles.flashcardDeck}>
            <Flashcard

                word={flashcards[currentCard].word}
                definition={flashcards[currentCard].definition}
                onNext={handleNext}
            />

            <div className={styles.centeredContainer}>
                <div className={styles.speakButton}>
                    <h2> Kuuntele </h2>
                    <button onClick={handleSpeakButtonClick}>
                        <img
                            src='/images/audio.png'
                            alt="Speaker Button"
                        />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default FlashcardDeckComponent;
