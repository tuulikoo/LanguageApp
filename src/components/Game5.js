/**
 * Game5 is a language learning game component that involves dragging and dropping words into the correct positions 
 * in a sentence. It displays feedback on correct or incorrect answers, and allows users to hear the sentence spoken aloud.
 *
 * @component
 * @example
 * return (
 *   <Game5 />
 * )
 *
 * @returns {React.ReactElement} A React component that renders a drag-and-drop sentence completion game.
 * It presents sentences with missing words, and users need to drag the correct words from a given set into these blanks.
 * Correct answers are validated, and users can listen to the complete sentence using text-to-speech functionality.
 */

import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    Button,
    Snackbar,
    Alert,
} from "@mui/material";
import { textToSpeech } from "@/utils/mimicApi";
import wordPairs from "../utils/wordlists/Game5wordlist.json";
import styles from "../styles/Game5.module.scss";
import updateUserPoints from "../helpers/PointAdder";
import { useUser } from "@/utils/userContext";
import { useTranslation } from "react-i18next";

function Game5() {
    const [currentPair, setCurrentPair] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [droppedWords, setDroppedWords] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [, setUserpoints] = useState(0);
    const { user } = useUser();
    const { t } = useTranslation();

    useEffect(() => {
        loadNewQuestion();
    }, []);

    useEffect(() => {
        if (isCorrect) {
            setOpenSnackbar(true);
        }
    }, [isCorrect]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const loadNewQuestion = () => {
        const randomPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
        setCurrentPair(randomPair);
        setDroppedWords(new Array(randomPair.answers.length).fill(""));
        setIsCorrect(false);
    };

    const handleDrop = (e, idx) => {
        const word = e.dataTransfer.getData("text");
        let newDroppedWords = [...droppedWords];
        newDroppedWords[idx] = word;
        setDroppedWords(newDroppedWords);

        if (
            JSON.stringify(newDroppedWords) === JSON.stringify(currentPair.answers)
        ) {
            setIsCorrect(true);
            const pointsToAdd = 1;
            updateUserPoints(user.id, pointsToAdd).then((updatedPoints) => {
                setUserpoints(updatedPoints);
            });
        }
    };

    const handleDragStart = (e, word) => {
        e.dataTransfer.setData("text", word);
    };

    const speakSentence = () => {
        let fullSentence = currentPair.sentence;
        currentPair.answers.forEach((answer, idx) => {
            fullSentence = fullSentence.replace("____", droppedWords[idx] || answer);
        });
        textToSpeech(fullSentence);
    };

    return (
        <Container className={styles.container}>
            {currentPair && (
                <>
                    <Typography variant="h4" className={styles.sentence}>
                        {currentPair.sentence.split("____").map((part, index) =>
                            index === currentPair.answers.length ? (
                                part
                            ) : (
                                <>
                                    {part}
                                    <Box
                                        component="span"
                                        onDrop={(e) => handleDrop(e, index)}
                                        onDragOver={(e) => e.preventDefault()}
                                        className={`${styles.dropBox} ${droppedWords[index]
                                            ? droppedWords[index] === currentPair.answers[index]
                                                ? styles.hasWord
                                                : styles.wrongAnswer
                                            : styles.empty
                                            }`}
                                    >
                                        {droppedWords[index]}
                                    </Box>
                                </>
                            ),
                        )}
                    </Typography>

                    <Grid container spacing={3} className={styles.wordsContainer}>
                        {[...currentPair.answers, ...currentPair.distractors].map(
                            (word, index) => (
                                <Grid item key={index}>
                                    <Paper
                                        className={styles.wordCard}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, word)}
                                    >
                                        {word}
                                    </Paper>
                                </Grid>
                            ),
                        )}
                    </Grid>

                    <div className={styles.buttons}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={styles.playButton}
                            onClick={speakSentence}
                        >
                            {t("G5play")}
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            className={styles.nextButton}
                            onClick={loadNewQuestion}
                        >
                            {t("G5next")}
                        </Button>
                    </div>

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={3000}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert
                            onClose={handleCloseSnackbar}
                            severity="success"
                            className={styles.feedback}
                        >
                            {t("G5correct")}
                        </Alert>
                    </Snackbar>
                </>
            )}
        </Container>
    );
}

export default Game5;
