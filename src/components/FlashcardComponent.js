import React, { useState } from "react";
import styles from "../styles/flashcards.module.scss";

const Flashcard = ({ word, definition, onNext }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.flashcard}>
    <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`} onClick={handleFlip}>
        <div className={styles.front}>
            <h3>{word}</h3>
        </div>
        <div className={styles.back}>
            <h3>{definition}</h3>
        </div>
    </div>
    <div className={styles.arrow} onClick={() => { setIsFlipped(false); onNext(); }}>
        →
    </div>
</div>

  );
};

export default Flashcard;
