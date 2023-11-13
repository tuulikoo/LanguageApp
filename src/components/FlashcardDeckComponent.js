import React, { useState } from "react";
import styles from "../styles/flashcards.module.css";
import { textToSpeech } from "@/utils/mimicApi";
import { Image } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import {t} from "i18next";

const Flashcard = ({ word, definition, isFlipped, onFlip, onNext, lang }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.flashcard}>
            <div
                className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
                onClick={onFlip}
            >
                <h3>{isFlipped ? t(definition[lang]) : word}</h3>
            </div>
            <div className={styles.arrow} onClick={onNext}>
                →
            </div>
        </div>
    );
};

const FlashcardDeck = ({ flashcards }) => {
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const { i18n } = useTranslation();

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false); // Reset flip when moving to the next card
        setCurrentCard((prevCard) => (prevCard + 1) % flashcards.length);
    };

    const handleSpeakButtonClick = () => {
        textToSpeech(flashcards[currentCard].word);
    };

    return (
        <div className={styles.flashcardDeck}>
            <Flashcard
                word={flashcards[currentCard].word}
                definition={flashcards[currentCard].definitions}
                isFlipped={isFlipped}
                onFlip={handleFlip}
                onNext={handleNext}
                lang={i18n.language}
            />

            <div className={styles.centeredContainer}>
                <div className={styles.speakButton}>
                    <h2> {t("G4listen")} </h2>
                    <button onClick={handleSpeakButtonClick}>
                        <Image src="/images/audio.png" alt="Speaker Button" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlashcardDeck;