import React, { useState } from "react";
import styles from "@/styles/Levels.module.css";

const Levels = () => {
    const levelsData = [
        {
            title: {
                english: "Learning Level",
                finnish: "Perustaso",
            },
            description: {
                english:
                    "Learn with flashcards, both in Finnish and English. This level is an excellent starting point for English language learners.",
                finnish:
                    "oppiminen korttien  mukaan, saat sanan suomeksi, kuin englanniksi. Tällä tasolla on hyvä aloittaa englannin kielen opiskelu.",
            },
        },
        {
            title: {
                english: "Level 1",
                finnish: "Taso 1",
            },
            description: {
                english:
                    "An easy task for children: pick the correct word based on the image. It's a great way to check how well you've learned from the previous level and if you remember the words. Earn points for correct answers on the first try.",
                finnish:
                    "lapsille helppo tehtävä kuvan mukaan keksiä, kumpi sanoista on oikein. Se on hyvä tapa tarkistaa, miten onnistui ensimmäisen tason oppiminen ja muistatko sanoja hyvin. Saat pisteita, jos onnistuu ensimmäisesta kerrasta oikeasti.",
            },
        },
        {
            title: {
                english: "Level 2",
                finnish: "Taso 2",
            },
            description: {
                english:
                    "Now, it's crucial to choose the correct image representing the English word. Earn points for correct answers on the first attempt.",
                finnish:
                    "nyt on tärkeää valita oikea kuva, mitä tarkoittaa lukea sana englanniksi ja valita oikea kuva. Saat pisteita onnistumisista.",
            },
        },
    ];

    const [flippedStates, setFlippedStates] = useState([true, true, true]);

    const handleItemClick = (index) => {
        const newFlippedStates = [...flippedStates];
        newFlippedStates[index] = !newFlippedStates[index];
        setFlippedStates(newFlippedStates);
    };
    return (
        <div className={`${styles.levels_container} custom-font`}>
            <h1 className={`font-custom ${styles.header}`}>Harjoituksia</h1>
            <ul className={styles.levels_list}>
                {levelsData.map((level, index) => (
                    <li
                        key={index}
                        className={`${styles.levels_item} font-custom`}
                        onClick={() => handleItemClick(index)}
                    >
                        <h2 className={styles.level_title}>
                            {flippedStates[index] ? level.title.finnish : level.title.english}
                        </h2>
                        <p className={styles.level_description}>
                            {flippedStates[index]
                                ? level.description.finnish
                                : level.description.english}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Levels;
