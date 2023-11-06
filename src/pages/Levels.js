import React, { useState } from "react";
import styles from "@/styles/Levels.module.css";
import { Button, Link } from "@mui/material";
import { RefreshOutlined } from "@mui/icons-material";
import { useUser } from "@/utils/userContext";

const Levels = () => {
  // get user language from userContext and set it to defaultLanguage
  //fi_FI=finnish, sv_SE=swedish, ja_JP=japanese
  const { user } = useUser();
  switch (user?.language) {
    case "fi_FI":
      var defaultLanguage = "finnish";
      break;
    case "sv_SE":
      var defaultLanguage = "swedish";
      break;
    case "ja_JP":
      var defaultLanguage = "japanese";
      break;
    default:
      var defaultLanguage = "finnish";
  }

  // Create a state to manage the current language for each level.
  const [currentLanguages, setCurrentLanguages] = useState(
    new Array(3).fill(defaultLanguage),
  );

  const handleLanguageToggle = (index) => {
    // Get the current language for the clicked item.
    const currentLanguage = currentLanguages[index];

    // Determine the next language to switch to.
    const nextLanguage =
      currentLanguage === "english"
        ? "finnish"
        : currentLanguage === "finnish"
        ? "japanese"
        : "english";

    // Update the state with the new language for the clicked item.
    setCurrentLanguages(
      currentLanguages.map((lang, i) => (i === index ? nextLanguage : lang)),
    );
  };
  const levelsData = [
    {
      title: {
        english: "Learning Level",
        finnish: "Perustaso",
        japanese: "初級",
      },
      description: {
        english:
          "Learn with flashcards, both in Finnish and English. This level is an excellent starting point for English language learners.",
        finnish:
          "oppiminen korttien  mukaan, saat sanan suomeksi, kuin englanniksi. Tällä tasolla on hyvä aloittaa englannin kielen opiskelu.",
        japanese:
          "フラッシュカードで学習する。このレベルは英語学習者にとって最適な出発点です。",
      },
      route: "/Level1",
    },
    {
      title: {
        english: "Image exercise",
        finnish: "Kuvaharjoituksia",
        japanese: "画像演習",
      },
      description: {
        english:
          "An easy task for children: pick the correct word based on the image. It's a great way to check how well you've learned from the previous level and if you remember the words. Earn points for correct answers on the first try.",
        finnish:
          "Tehtävänä valita oikea sana kuvan perusteella. Tämä on hyvä tapa tarkistaa, kuinka hyvin olet oppinut edellisestä tasosta ja muistatko sanat. Saat pisteitä oikeista vastauksista.",
        japanese:
          "画像に基づいて正しい単語を選択します。これは、前のレベルからどれだけよく学んだか、そして単語を覚えているかどうかを確認するのに最適な方法です。正しい答えを最初に入力すると、ポイントを獲得します。",
      },
      route: "/Game4",
    },
    {
      title: {
        english: "Listening exercise",
        finnish: "Kuunteluharjoituksia",
        japanese: "リスニング演習",
      },
      description: {
        english:
          "Listening exercise: listen to the word and write it down. Earn points for correct answers",
        finnish:
          "Kuunteluharjoitus: kuuntele sana ja kirjoita se. Saat pisteita oikeista vastauksista.",
        japanese:
          "リスニング演習：単語を聞いて書き留めます。正しい答えのポイントを獲得します。",
      },
      route: "/Game2",
    },
  ];
  const getButtonText = (language) => {
    switch (language) {
      case "english":
        return "In Finnish";
      case "finnish":
        return "In Japanese";
      case "japanese":
        return "In English";
      default:
        return "In Finnish";
    }
  };

  return (
    <div className={styles.levels_container}>
      <h1 className={styles.header}>Harjoituksia</h1>
      <ul className={styles.levels_list}>
        {levelsData.map((level, index) => (
          <li key={index} className={styles.levels_item}>
            <Link href={level.route} className={styles.levels_link}>
              <h2 className={styles.level_title}>
                {level.title[currentLanguages[index]]}
              </h2>
              <p className={styles.level_description}>
                {level.description[currentLanguages[index]]}
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
                {getButtonText(currentLanguages[index])}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Levels;
