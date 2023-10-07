import React, { useState } from 'react';
import FlashcardDeckComponent from "@/components/FlashcardDeckComponent";
import styles from '../styles/level1.module.css';
import flashcardsData from "../utils/wordlists/flshcardsanat.json";


const Level1 = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };


    const getCategoryButtonClassName = (category) => {
        return category === selectedCategory ? styles.selectedCategoryButton : styles.categoryButton;
    };

    return (
        <div className={styles.pageContainer}>
            <h1 className={`${styles.pageTitle} font-custom`}>Level 1 Flashcards</h1>

            <div className={styles.categorySelector}>
                <p className="font-custom">Mitä flashcard kategoriaa haluat opiskella?</p>
                <div className={styles.categoryButtons}>
                    <button
                        className={getCategoryButtonClassName('animals')}
                        onClick={() => handleCategorySelect('animals')}
                    >
                        Elaimet
                    </button>
                    <button
                        className={getCategoryButtonClassName('food')}
                        onClick={() => handleCategorySelect('food')}
                    >
                        Ruoka
                    </button>
                    <button
                        className={getCategoryButtonClassName('people')}
                        onClick={() => handleCategorySelect('people')}
                    >
                        Ihmiset
                    </button>
                </div>
            </div>

            <div className={styles.flashcardsWrapper}>
                {selectedCategory && (
                    <div className={styles.flashcardContainer}>

                        <h2 className={`${styles.selectedCategoryTitle} font-custom`}>{selectedCategory}</h2>

                        <FlashcardDeckComponent flashcards={flashcardsData.flashcards[selectedCategory]} />
                    </div>
                )}
            </div>


        </div>
    );
};

export default Level1;
