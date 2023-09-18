import React from 'react';
import FlashcardDeckComponent from "@/components/FlashcardDeckComponent";
import styles from '../styles/level1.module.css';


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
            <div className={styles.pageContainer}>
                <h1 className={styles.pageTitle}>Level 1 Flashcards</h1>

                <div className={styles.categoryContainer}>
                    <h2>Animals</h2>
                    <div className={styles.flashcardContainer}>
                        <FlashcardDeckComponent flashcards={animalFlashcards} />
                    </div>
                </div>

                <div className={styles.categoryContainer}>
                    <h2>Foods</h2>
                    <div className={styles.flashcardContainer}>
                        <FlashcardDeckComponent flashcards={foodFlashcards} />
                    </div>
                </div>

                <div className={styles.categoryContainer}>
                    <h2>People</h2>
                    <div className={styles.flashcardContainer}>
                        <FlashcardDeckComponent flashcards={peopleFlashcards} />
                    </div>
                </div>
            </div>
        );
    };


    export default Level1;