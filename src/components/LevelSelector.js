import { useState } from "react";
import styles from "@/styles/LevelSelector.module.scss";
import { Button } from "@mui/material";
import Link from "next/link";
import { RefreshOutlined } from "@mui/icons-material";
import Image from "next/image";
import { getSelectedLanguage } from "@/utils/selectedLanguage";
import { useUser } from "@/utils/userContext";
import { CircularProgress } from "@mui/material";

const levelsData = [
    {
        title: {
            english: "Learning Level",
            finnish: "Perustaso",
            swedish: "Grundnivå",
            japanese: "初級",
        },
        description: {
            english:
                "Learn with flashcards, both in Finnish and English. This level is an excellent starting point for English language learners.",
            finnish:
                "Oppiminen korttien  mukaan, saat sanan suomeksi, kuin englanniksi. Tällä tasolla on hyvä aloittaa englannin kielen opiskelu.",
            swedish:
                "Lär dig med flashcards, både på finska och engelska. Den här nivån är en utmärkt utgångspunkt för engelska språkstuderande.",
            japanese:
                "フラッシュカードで学ぶ、フィンランド語と英語の両方。このレベルは、英語学習者にとって優れた出発点です。",
        },
        route: "/Flashcards",
        image: "/svg/blob.svg",
    },
    {
        title: {
            english: "Image exercise",
            finnish: "Kuvaharjoituksia",
            swedish: "Bildövningar",
            japanese: "画像演習",
        },
        description: {
            english:
                "ick the correct word based on the image. It's a great way to check how well you've learned from the previous level and if you remember the words",
            finnish:
                "Tehtävänä valita oikea sana kuvan perusteella. Tämä on hyvä tapa tarkistaa, kuinka hyvin olet oppinut edellisestä tasosta ja muistatko sanat.",
            swedish:
                "Välj rätt ord baserat på bilden. Det är ett bra sätt att kontrollera hur bra du har lärt dig från föregående nivå och om du kommer ihåg orden.",
            japanese:
                "画像を基に正しい単語を選択します。前のレベルからどれだけ学んだか、単語を覚えているかを確認するのに最適な方法です。",
        },
        route: "/Game4",
        image: "/svg/blob2.svg",
    },
    {
        title: {
            english: "Listening exercise",
            finnish: "Kuunteluharjoituksia",
            swedish: "Lyssningsövningar",
            japanese: "リスニング演習",
        },
        description: {
            english:
                "Listening exercise: listen to the word and write it down. Earn points for correct answers",
            finnish:
                "Kuunteluharjoitus: kuuntele sana ja kirjoita se. Saat pisteita oikeista vastauksista.",
            swedish:
                "Lyssningsövning: lyssna på ordet och skriv ner det. Få poäng för rätt svar.",
            japanese:
                "リスニング演習：単語を聞いて書き留めます。正しい答えにはポイントが付きます。",
        },
        route: "/Game2",
        image: "/svg/blob3.svg",
    },
    {
        title: {
            english: "Listening exercise 2",
            finnish: "Kuunteluharjoituksia 2",
            swedish: "Lyssningsövningar 2",
            japanese: "リスニング演習2",
        },
        description: {
            english:
                "Listening exercise: listen the sentence and choose correct words.",
            finnish:
                "Kuunteluharjoitus: kuuntele lause ja valitse oikeat sanat.",
            swedish: "Lyssningsövning: lyssna på meningen och välj rätt ord.",
            japanese: "リスニング演習：文を聞いて正しい単語を選択します。",
        },
        route: "/Game5",
        image: "/svg/blob4.svg",
    },
    {
        title: {
            english: "Listening exercise 3",
            finnish: "Kuunteluharjoituksia 3",
            swedish: "Lyssningsövningar 3",
            japanese: "リスニング演習3",
        },
        description: {
            english:
                "Listening exercise: listen and read the story and choose correct aswers.",
            finnish:
                "Kuunteluharjoitus: kuuntele ja lue tarina ja valitse oikeat vastaukset.",
            swedish:
                "Lyssningsövning: lyssna och läs historien och välj rätt svar.",
            japanese:
                "リスニング演習：物語を聞いて読んで正しい答えを選択します。",
        },
        route: "/Story",
        image: "/svg/blob5.svg",
    },
];

const LevelSelector = () => {
    const languages = ["finnish", "english", "swedish", "japanese"];
    const { user, loading } = useUser();
    const pointTresholds = [0, 50, 100, 130, 200];

    if (loading) {
        return <div className={styles.loading_container}>
            <CircularProgress />
        </div>;
    }



    const isLevelAvailable = (levelIndex) => {
        console.log(`Level ${levelIndex}: Required Points: ${pointTresholds[levelIndex]}, User Points: ${user.userPoints}`);
        return user.userPoints >= pointTresholds[levelIndex];
    };

    const formatLanguageCode = () => {
        switch (getSelectedLanguage()) {
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

    // Initialize language states for each level
    const [languageStates, setLanguageStates] = useState(
        Array(levelsData.length).fill(formatLanguageCode())
    );

    const handleItemClick = (index, e) => {
        // Prevent the link navigation
        e.preventDefault();
        e.stopPropagation();

        if (!isLevelAvailable(index)) {
            return; // Do nothing if the level is not available
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
                {levelsData.map((level, index) => {
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
                                onClick={
                                    isAvailable
                                        ? null
                                        : (e) => e.preventDefault()
                                }
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
                                <Button
                                    disabled={!isAvailable} // Disable the button if the level is not available
                                    className={styles.level_button}
                                    size="small"
                                    startIcon={<RefreshOutlined />}
                                    onClick={(e) => handleItemClick(index, e)}
                                >
                                    {getNextLanguage(languageStates[index])}
                                </Button>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
export default LevelSelector;
