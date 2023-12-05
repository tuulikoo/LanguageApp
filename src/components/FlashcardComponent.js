import React, { useState } from "react";
import styles from "../styles/flashcards.module.css"; // Import the CSS module
/**
 * Flashcard component for displaying a flashcard with a word and its translated definition.
 * The card flips to reveal the definition when clicked.
 *
 * @component
 * @example
 * const word = "Example";
 * const definition = { en: "A representative form or pattern." };
 * const isFlipped = false;
 * const onFlip = () => console.log("Card flipped");
 * const onNext = () => console.log("Next card");
 * const lang = "en";
 * return (
 *   <Flashcard word={word} definition={definition} isFlipped={isFlipped}
 *              onFlip={onFlip} onNext={onNext} lang={lang} />
 * )
 *
 * @param {Object} props - The props for the Flashcard component.
 * @param {string} props.word - The word to be displayed on the flashcard.
 * @param {Object} props.definition - An object containing definitions of the word in different languages.
 * @param {boolean} props.isFlipped - State to control whether the card is flipped or not.
 * @param {Function} props.onFlip - Callback function to trigger flipping of the card.
 * @param {Function} props.onNext - Callback function to trigger when moving to the next card.
 * @param {string} props.lang - The current language selected for the definition.
 *
 * @returns {React.ReactElement} A React component that renders a single flashcard.
 */

const Flashcard = ({ word, definition, onNext }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={styles.flashcard}>
            <div
                className={`${styles.card} ${isFlipped ? styles.flipped : ""}`} // Use CSS module class names
                onClick={handleFlip}
            >
                <h3>{isFlipped ? definition : word}</h3>
            </div>
            <div
                className={styles.arrow}
                onClick={() => {
                    setIsFlipped(false);
                    onNext();
                }}
            >
                →
            </div>
        </div>
    );
};

export default Flashcard;
