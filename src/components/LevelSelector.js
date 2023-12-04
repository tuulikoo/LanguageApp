/**
 * LevelSelector is a component that displays a list of language learning levels. 
 * Each level is represented by an image, title, and description, and can be interacted with to cycle through
 * available languages. The component checks user points to determine level availability and updates the display
 * language based on the user's selection.
 *
 * @component
 * @example
 * return (
 *   <LevelSelector />
 * )
 *
 * @returns {React.ReactElement} A React component that renders a list of levels for language learning. 
 * It allows users to view and interact with different levels, changing the language of the level's content. 
 * Levels are unlocked based on the user's points, and unavailable levels are visually distinguished.
 */

import { useState } from "react";
import styles from "@/styles/LevelSelector.module.scss";
import Link from "next/link";
import { RefreshOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useSelectedLanguage } from "@/utils/selectedLanguage";
import { useUser } from "@/utils/userContext";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import levelsData2 from "@/utils/wordlists/levelsData2";

const LevelSelector = () => {
    const { user, loading } = useUser();
    const selectedLanguage = useSelectedLanguage();
    const pointThresholds = [0, 50, 100, 130, 200];
    const languages = ["finnish", "english", "swedish", "japanese"]; // Define your languages

    const isLevelAvailable = (levelIndex) => {
        return user.userPoints >= pointThresholds[levelIndex];
    };

    const formatLanguageCode = (languageCode) => {
        switch (languageCode) {
            case "fi_FI":
                return "finnish";
            case "sv_SE":
                return "swedish";
            case "ja_JP":
                return "japanese";
            default:
                return "english";
        }
    };

    const [languageStates, setLanguageStates] = useState(
        Array(levelsData2.length).fill(formatLanguageCode(selectedLanguage))
    );

    useEffect(() => {
        setLanguageStates(
            Array(levelsData2.length).fill(formatLanguageCode(selectedLanguage))
        );
    }, [selectedLanguage]);

    if (loading) {
        return (
            <div className={styles.loading_container}>
                <CircularProgress />
            </div>
        );
    }

    const handleItemClick = (index, e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isLevelAvailable(index)) {
            return;
        }

        const nextLanguage = (currentLanguage) => {
            const currentIndex = languages.indexOf(currentLanguage);
            return languages[(currentIndex + 1) % languages.length];
        };

        setLanguageStates((prevStates) =>
            prevStates.map((lang, idx) =>
                idx === index ? nextLanguage(lang) : lang
            )
        );
    };

    const getNextLanguage = (currentLanguage) => {
        const currentIndex = languages.indexOf(currentLanguage);
        return languages[(currentIndex + 1) % languages.length];
    };

    const getLanguageContent = (level, language) => ({
        title: level.title[language],
        description: level.description[language],
    });

    return (
        <div className={styles.levels_container}>
            <ul className={styles.levels_list}>
                {levelsData2.map((level, index) => {
                    const isAvailable = isLevelAvailable(index);
                    const itemClass = isAvailable
                        ? styles.levels_item
                        : `${styles.levels_item} ${styles.levels_item_unavailable}`;
                    const { title, description } = getLanguageContent(
                        level,
                        languageStates[index]
                    );

                    return (
                        <li key={index} className={itemClass}>
                            <Link
                                href={isAvailable ? level.route : "#"}
                                className={styles.levels_link}
                            >
                                <Image
                                    src={level.image}
                                    alt="level"
                                    width={200}
                                    height={200}
                                    className={styles.level_image}
                                />
                                <h2 className={styles.level_title}>{title}</h2>
                                <p className={styles.level_description}>
                                    {description}
                                </p>
                                <button
                                    disabled={!isAvailable}
                                    className={styles.level_button}
                                    size="small"
                                    startIcon={<RefreshOutlined />}
                                    onClick={(e) => handleItemClick(index, e)}
                                >
                                    {getNextLanguage(languageStates[index])}
                                </button>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default LevelSelector;
