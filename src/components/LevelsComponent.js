import React from "react";
import { useState, useEffect } from "react";
import styles from "@/styles/Levels.module.scss";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useSelectedLanguage } from "@/utils/selectedLanguage";
import levelsData from "../utils/wordlists/LevelsData";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
/**
 * Levels is a component that displays a list of language learning levels. Each level is represented by a title and 
 * description, and users can interact with each level to toggle through different available languages. The component 
 * dynamically updates language display based on user's selection and utilizes internationalization for multilingual support.
 *
 * @component
 * @example
 * return (
 *   <Levels />
 * )
 *
 * @returns {React.ReactElement} A React component that renders a list of levels for language learning.
 * It allows users to view and interact with different levels, changing the language of each level's title and description.
 * The component supports multilingual display, adapting to the selected language preference of the user.
 */


const Levels = () => {
    const selectedLanguage = useSelectedLanguage();
    const [levelLanguages, setLevelLanguages] = useState(
        new Array(levelsData.length).fill(selectedLanguage)
    );
    const { t } = useTranslation();

    const getText = (textObject, lang) =>
        textObject[lang] || textObject["fi_FI"] || textObject["en_GB"];

    useEffect(() => {
        console.log("Selected language changed to:", selectedLanguage);
        setLevelLanguages(new Array(levelsData.length).fill(selectedLanguage));
    }, [selectedLanguage]);

    const languages = ["en_GB", "fi_FI", "ja_JP", "sv_SE"];
    const toggleLevelLanguage = (index) => {
        const currentLang = levelLanguages[index];
        const currentIndex = languages.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % languages.length;
        setLevelLanguages(
            levelLanguages.map((lang, i) =>
                i === index ? languages[nextIndex] : lang
            )
        );
    };
    return (
        <div className={styles.levels_container}>
            <h1 className={styles.header}>{t("levelsTitle")}</h1>
            <ul className={styles.levels_list}>
                {levelsData.map((level, index) => (
                    <li key={index} className={styles.levels_item}>
                        <Link href={level.route} className={styles.levels_link}>
                            <h2 className={styles.level_title}>
                                {getText(level.title, levelLanguages[index])}
                            </h2>
                            <p className={styles.level_description}>
                                {getText(
                                    level.description,
                                    levelLanguages[index]
                                )}
                            </p>
                        </Link>
                        <button
                            className={styles.level_button}
                            onClick={() => toggleLevelLanguage(index)}
                        >
                            <ArrowForwardIosIcon />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Levels;
