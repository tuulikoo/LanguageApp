import React, { useState } from 'react';

const Flashcard = ({ word, definition, onNext }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const cardStyles = {
        width: '300px',
        height: '200px',
        perspective: '1000px',
        margin: '20px',
        cursor: 'pointer',
        position: 'relative',
    };

    const frontStyles = {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        border: '1px solid #ddd',
        backgroundColor: '#fff',
        backfaceVisibility: 'hidden',
        transition: 'transform 0.5s',
    };

    const backStyles = {
        transform: 'rotateY(180deg)',
    };

    const arrowStyles = {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        fontSize: '1.5rem',
        cursor: 'pointer',
    };

    return (
        <div className="flashcard" style={cardStyles}>
            <div
                className={`card ${isFlipped ? 'flipped' : ''}`}
                style={frontStyles}
                onClick={handleFlip}
            >
                <h3>{isFlipped ? definition : word}</h3>
            </div>
            <div className="arrow" onClick={() => { setIsFlipped(false); onNext(); }} style={arrowStyles}>
                →
            </div>
        </div>
    );
};

export default Flashcard;
