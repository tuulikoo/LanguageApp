import React, { useState } from 'react';
import FlashcardDeckComponent from "@/components/FlashcardDeckComponent";
import styles from '../styles/level1.module.scss';
import flashcardsData from 'src/utils/wordlists/flashcardsanat.json';
import { textToSpeech } from "@/utils/mimicApi";

const Level1 = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSpeakButtonClick = () => {
        // Assuming you have a mechanism to get the current word
        textToSpeech(currentWord);
    };

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>Sanoja ja lauseita</h1>

            <div className={styles.categorySelector}>
                {['animals', 'food', 'people'].map(category => (
                    <button
                        key={category}
                        className={selectedCategory === category ? styles.selectedCategoryButton : styles.categoryButton}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {selectedCategory && (
                <div className={styles.flashcardsWrapper}>
                    <h2 className={styles.selectedCategoryTitle}>{selectedCategory}</h2>
                    <img
                        className={styles.speakButton}
                        src='/images/audio.png'
                        alt="Speaker Button"
                        onClick={handleSpeakButtonClick}
                    />
                    <FlashcardDeckComponent flashcards={flashcardsData.flashcards[selectedCategory]} />
                </div>
            )}
        </div>
    );
};

export default Level1;
