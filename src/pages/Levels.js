import React, { useState, useEffect } from "react";
import styles from "@/styles/Levels.module.css";
import { Button } from "@mui/material";
import { RefreshOutlined } from "@mui/icons-material";
import { useUser } from "@/utils/userContext";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const levelsData = [
    {
        title: {
            english: "Learning Level",
            finnish: "Perustaso",
            japanese: "初級",
            swedish: "Grundnivå",
        },
        description: {
            english:
                "Learn with flashcards, both in Finnish and English. This level is an excellent starting point for English language learners.",
            finnish:
                "oppiminen korttien  mukaan, saat sanan suomeksi, kuin englanniksi. Tällä tasolla on hyvä aloittaa englannin kielen opiskelu.",
            japanese:
                "フラッシュカードで学習する。このレベルは英語学習者にとって最適な出発点です。",
            swedish:
                "Lär dig med flashcards, både på finska och engelska. Denna nivå är en utmärkt utgångspunkt för engelska språkinlärare.",
        },
        route: "/Flashcards",
    },
    {
        title: {
            english: "Image exercise",
            finnish: "Kuvaharjoituksia",
            japanese: "画像演習",
            swedish: "Bildövning",
        },
        description: {
            english:
                "An easy task for children: pick the correct word based on the image. It's a great way to check how well you've learned from the previous level and if you remember the words. Earn points for correct answers on the first try.",
            finnish:
                "Tehtävänä valita oikea sana kuvan perusteella. Tämä on hyvä tapa tarkistaa, kuinka hyvin olet oppinut edellisestä tasosta ja muistatko sanat. Saat pisteitä oikeista vastauksista.",
            japanese:
                "画像に基づいて正しい単語を選択します。これは、前のレベルからどれだけよく学んだか、そして単語を覚えているかどうかを確認するのに最適な方法です。正しい答えを最初に入力すると、ポイントを獲得します。",
            swedish:
                "Uppgiften är att välja rätt ord utifrån bilden. Det här är ett bra sätt att kontrollera hur väl du har lärt dig från föregående nivå och om du kommer ihåg orden. Du får poäng för rätt svar.",
        },
        route: "/Game4",
    },
    {
        title: {
            english: "Listening exercise",
            finnish: "Kuunteluharjoituksia",
            japanese: "リスニング演習",
            swedish: "Lyssningsövningar",
        },
        description: {
            english:
                "Listening exercise: listen to the word and write it down. Earn points for correct answers",
            finnish:
                "Kuunteluharjoitus: kuuntele sana ja kirjoita se. Saat pisteita oikeista vastauksista.",
            japanese:
                "リスニング演習：単語を聞いて書き留めます。正しい答えのポイントを獲得します。",
            swedish:
                "Lyssningsövning: lyssna på ordet och skriv det. Du får poäng för rätt svar.",
        },
        route: "/Game2",
    },
];

const Levels = () => {
    const { user } = useUser();
    const { t } = useTranslation();

    // Function to map user language to component language
    const getLanguageCode = (language) => {
        const languageMap = {
            fi_FI: "finnish",
            sv_SE: "swedish",
            ja_JP: "japanese",
            // Default to Finnish if user language is not on the list
            default: "finnish",
        };
        return languageMap[language] || languageMap.default;
    };

    // Set the initial state to the default language or the user's language if logged in
    const initialLanguage = getLanguageCode(user?.language);
    const [currentLanguages, setCurrentLanguages] = useState(
        new Array(levelsData.length).fill(initialLanguage),
    );

    useEffect(() => {
        // This effect runs only on the client and updates the state if the user's language changes
        const userLanguage = getLanguageCode(user?.language);
        if (userLanguage !== initialLanguage) {
            setCurrentLanguages(new Array(levelsData.length).fill(userLanguage));
        }
        // The empty dependency array ensures this effect runs only once on mount
    }, []);

    const handleLanguageToggle = (index) => {
        // Mapping to determine the next language
        const nextLanguage = {
            english: "finnish",
            finnish: "swedish",
            swedish: "japanese",
            japanese: "english",
        };

        // Update the state with the new language for the clicked item
        setCurrentLanguages(
            currentLanguages.map((lang, i) =>
                i === index ? nextLanguage[lang] || nextLanguage.english : lang,
            ),
        );
    };

    const getButtonText = (language) => {
        switch (language) {
            case "english":
                return "Suomeksi";
            case "finnish":
                return "På Svenska";
            case "swedish":
                return "日本語で";
            case "japanese":
                return "In English";
            default:
                return "Suomeksi";
        }
    };

    return (
        <div className={styles.levels_container}>
            <h1 className={styles.header}>{t("levelsTitle")}</h1>
            <ul className={styles.levels_list}>
                {levelsData.map((level, index) => (
                    <li key={index} className={styles.levels_item}>
                        <Link href={level.route} className={styles.levels_link}>
                            <h2 className={styles.level_title}>
                                {level.title[currentLanguages[index] || defaultLanguage]}
                            </h2>
                            <p className={styles.level_description}>
                                {level.description[currentLanguages[index] || defaultLanguage]}
                            </p>
                            <Button
                                className={styles.level_button}
                                size="small"
                                startIcon={<RefreshOutlined />}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLanguageToggle(index);
                                }}
                            >
                                {getButtonText(currentLanguages[index] || defaultLanguage)}
                            </Button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Levels;
