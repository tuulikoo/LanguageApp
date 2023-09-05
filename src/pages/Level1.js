import React from 'react';
import FlashcardDeckComponent from "@/components/FlashcardDeckComponent";
import styles from '../styles/Footer.module.css';


const Level1 = () => {
    const animalFlashcards = [
        {
            word: 'Leijona',
            definition: 'Lion',
        },
        {
            word: 'Elefantti',
            definition: 'Elephant',
        },
    ];

    const foodFlashcards = [
        {
            word: 'Appelsiini',
            definition: 'Orange',
        },
        {
            word: 'Mansikka',
            definition: 'Strawberry',
        },
    ];

    const peopleFlashcards = [
        {
            word: 'Opettaja',
            definition: 'Teacher',
        },
        {
            word: 'Lääkäri',
            definition: 'Doctor',
        },
    ];

    return (
        <div>
            <h1>Level 1 Flashcards</h1>
            <h2>Animals</h2>
            <FlashcardDeckComponent flashcards={animalFlashcards} />
            <h2>Foods</h2>
            <FlashcardDeckComponent flashcards={foodFlashcards} />
            <h2>People</h2>
            <FlashcardDeckComponent flashcards={peopleFlashcards} />
        </div>
    );
};

export default Level1;


