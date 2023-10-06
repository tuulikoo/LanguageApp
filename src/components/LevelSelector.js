import { useState } from 'react';
import styles from "@/styles/LevelSelector.module.scss";
import { Button, Link as MuiLink } from "@mui/material";
import { RefreshOutlined } from "@mui/icons-material";

const LevelSelector = () => {
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
            route: "/Flashcards",
            image: "/svg/blob.svg"
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
            image: "/svg/blob2.svg"
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
            image: "/svg/blob3.svg"
        },
        {
            title: {
                english: "Listening exercise 2",
                finnish: "Kuunteluharjoituksia 2",
            },
            description: {
                english:
                    "Listening exercise: listen the sentence and choose correct words. Earn points for correct answers",
                finnish:
                    "Kuunteluharjoitus: kuuntele lause ja valitse oikeat sanat. Saat pisteitä oikeista vastauksista.",
            },
            route: "/Game5",
            image: "/svg/blob4.svg"
        }
    ];




    return (
        <div className={styles.levels_container}>
            <ul className={styles.levels_list}>
                {levelsData.map((level, index) => (
                    <li key={index} className={styles.levels_item}>
                        <MuiLink href={level.route} className={styles.levels_link}>
                            <img src={level.image} alt="level" className={styles.level_image} />
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
                                {flippedStates[index] ? "English" : "Suomeksi"}
                            </Button>
                        </MuiLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LevelSelector;

