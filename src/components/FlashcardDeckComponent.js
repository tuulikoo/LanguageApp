import React, { useState } from "react";
import styles from "../styles/flashcards.module.css";
import { textToSpeech } from "@/utils/mimicApi";
import { Image } from "react-bootstrap";

const Flashcard = ({ word, definition, isFlipped, onFlip, onNext }) => {
  return (
    <div className={styles.flashcard}>
      <div
        className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
        onClick={onFlip}
      >
        <h3>{isFlipped ? definition : word}</h3>
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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false); // Reset flip when moving to next card
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
        isFlipped={isFlipped}
        onFlip={handleFlip}
        onNext={handleNext}
      />

      <div className={styles.centeredContainer}>
        <div className={styles.speakButton}>
          <h2> Kuuntele </h2>
          <button onClick={handleSpeakButtonClick}>
            <Image src="/images/audio.png" alt="Speaker Button" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDeck;
