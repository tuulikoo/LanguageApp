import React, { useState } from "react";
import styles from "@/styles/Levels.module.css";
import { Button, Link } from "@mui/material";
import { RefreshOutlined } from "@mui/icons-material";

const Levels = () => {
    const [flippedStates, setFlippedStates] = useState([true, true, true]);

    const handleItemClick = (index) => {
        const newFlippedStates = [...flippedStates];
        newFlippedStates[index] = !newFlippedStates[index];
        setFlippedStates(newFlippedStates);
    };
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
            route: "/flashcards",
        },
        {
            title: {
                english: "Image exercise",
                finnish: "Kuvaharjoituksia",
            },
            description: {
                english:
                    "An easy task for children: pick the correct word based on the image. It's a great way to check how well you've learned from the previous level and if you remember the words. Earn points for correct answers on the first try.",
                finnish:
                    "Tehtävänä valita oikea sana kuvan perusteella. Tämä on hyvä tapa tarkistaa, kuinka hyvin olet oppinut edellisestä tasosta ja muistatko sanat. Saat pisteitä oikeista vastauksista.",
            },
            route: "/Game4",
        },
        {
            title: {
                english: "Listening exercise",
                finnish: "Kuunteluharjoituksia",
            },
            description: {
                english:
                    "Listening exercise: listen to the word and write it down. Earn points for correct answers",
                finnish:
                    "Kuunteluharjoitus: kuuntele sana ja kirjoita se. Saat pisteita oikeista vastauksista.",
            },
            route: "/Game2",
        },
    ];

    return (
        <div className={styles.levels_container}>
            <h1 className={styles.header}>Harjoituksia</h1>
            <ul className={styles.levels_list}>
                {levelsData.map((level, index) => (
                    <li
                        key={index}
                        className={styles.levels_item}
                    >
                        <Link href={level.route} className={styles.levels_link}>

                            <h2 className={styles.level_title}>
                                {flippedStates[index]
                                    ? level.title.finnish
                                    : level.title.english}
                            </h2>
                            <p className={styles.level_description}>
                                {flippedStates[index]
                                    ? level.description.finnish
                                    : level.description.english}
                            </p>
                            <Button
                                className={styles.level_button}
                                size="small"
                                startIcon={<RefreshOutlined />}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleItemClick(index);
                                }}
                            >
                            </Button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Levels;
