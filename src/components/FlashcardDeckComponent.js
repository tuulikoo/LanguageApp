import React, { useState } from 'react';
import Flashcard from './FlashcardComponent';

const FlashcardDeck = ({ flashcards }) => {
    const [currentCard, setCurrentCard] = useState(0);

    const handleNext = () => {
        setCurrentCard((prevCard) => (prevCard + 1) % flashcards.length);
    };

    return (
        <div className="flashcard-deck">
            <Flashcard
                word={flashcards[currentCard].word}
                definition={flashcards[currentCard].definition}
                onNext={handleNext}
            />
        </div>
    );
};

export default FlashcardDeck;
