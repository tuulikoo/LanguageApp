import React, { useState, useEffect } from "react";
import {
    Button,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Container,
} from "@mui/material";
import stories from "@/utils/wordlists/stories.json";
import { textToSpeech } from "@/utils/mimicApi";
import styles from "../styles/Game6Component.module.scss";
import updateUserPoints from "../helpers/PointAdder";
import { useUser } from "@/utils/userContext";
import { useTranslation } from "react-i18next";

function GameStoryComponent() {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [isStoryStarted, setIsStoryStarted] = useState(false);
    const [isTextRevealed, setIsTextRevealed] = useState(false);
    const { user } = useUser();
    const { t } = useTranslation();

    const loadNewStory = () => {
        setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
        setSelectedAnswer(null);
        setFeedback("");
        setDisplayedText("");
        setIsStoryStarted(false);
    };

    const revealText = () => {
        setIsTextRevealed(true);
    };

    const startStory = () => {
        const story = stories[currentStoryIndex];
        setTimeout(() => {
            playStory(story.content);
        }, 3000);
        textToSpeech(story.content);
        setIsStoryStarted(true);
    };

    const playStory = (storyContent) => {
        const words = storyContent.split(" ");
        const duration = (60 / 150) * 1000;

        let currentText = "";
        words.forEach((word, index) => {
            setTimeout(() => {
                currentText += word + " ";
                setDisplayedText(currentText);
            }, index * duration);
        });
    };

    const handleSubmit = () => {
        if (selectedAnswer == stories[currentStoryIndex].correctAnswer) {
            setFeedback(t("G6correct"));
            updateUserPoints(user.id, 2);
        } else {
            setFeedback(t("G6incorrect"));
        }
    };

    return (
        <Container className={styles.container}>
            <Typography variant="h5" gutterBottom>
                {t("G6title")}
            </Typography>
            {!isStoryStarted ? (
                <div className={styles.startButton}>
                    <Button
                        onClick={startStory}
                        variant="contained"
                        className={styles.primaryButton}
                    >
                        {t("G6start")}
                    </Button>
                </div>
            ) : (
                <>
                    <div className={styles.storyContent}>
                        <Typography variant="body1" gutterBottom>
                            {displayedText}
                        </Typography>
                        {stories[currentStoryIndex] && (
                            <>
                                <RadioGroup
                                    value={selectedAnswer}
                                    onChange={(e) =>
                                        setSelectedAnswer(e.target.value)
                                    }
                                >
                                    {stories[currentStoryIndex].options.map(
                                        (option, index) => (
                                            <FormControlLabel
                                                key={index}
                                                value={`${index}`}
                                                control={<Radio />}
                                                label={option}
                                            />
                                        )
                                    )}
                                </RadioGroup>
                                <Typography
                                    color="primary"
                                    gutterBottom
                                    className={styles.feedback}
                                >
                                    {feedback}
                                </Typography>
                                <Button
                                    onClick={handleSubmit}
                                    variant="contained"
                                    className={styles.primaryButton}
                                >
                                    {t("G6submit")}
                                </Button>
                                <Button
                                    onClick={loadNewStory}
                                    variant="contained"
                                    style={{ marginLeft: "10px" }}
                                    className={styles.primaryButton}
                                >
                                    {t("G6next")}
                                </Button>
                            </>
                        )}
                    </div>
                </>
            )}
        </Container>
    );
}
export default GameStoryComponent;

