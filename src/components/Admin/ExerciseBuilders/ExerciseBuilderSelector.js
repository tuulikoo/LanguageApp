import React, { useEffect, useState } from "react";
import ExerciseBuilder from "./ExerciseBuilder";
import ImageExerciseBuilder from "../ImageExerciseBuilder";
import { Box } from "@mui/system";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import styles from "../../../styles/ExerciseBuilderSelector.module.scss";

const ExerciseBuilderSelector = () => {
    const [selectedExercise, setSelectedExercise] = useState("");
    const [files, setFiles] = useState([]);

    const availableExercises = [
        { name: "Listening Exercise", value: "listening" },
        { name: "Images Exercise", value: "images" },
    ];

    useEffect(() => {
        if (selectedExercise) {
            // Make an API call to fetch the files associated with the selected exercise
            fetch(`/api/fileHelper?type=${selectedExercise}`)
                .then(response => response.json())
                .then(data => setFiles(data))
                .catch(error => console.error("Error fetching exercise files:", error));
        } else {
            setFiles([]);
        }
    }, [selectedExercise]);

    const handleExerciseChange = (event) => {
        setSelectedExercise(event.target.value);
    };

    // Helper function to render the appropriate builder based on the selected exercise
    const renderBuilder = () => {
        switch (selectedExercise) {
            case "listening":
                return <ExerciseBuilder files={files} />;
            case "images":
                return <ImageExerciseBuilder />;
            default:
                return null;
        }
    };

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="exercise-select-label">Choose exercise</InputLabel>
                <Select
                    className={styles.select}
                    labelId="exercise-select-label"
                    id="exercise-select"
                    value={selectedExercise}
                    label="Choose exercise"
                    variant="outlined"
                    onChange={handleExerciseChange}
                >
                    {availableExercises.map((exercise) => (
                        <MenuItem key={exercise.value} value={exercise.value}>
                            {exercise.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {renderBuilder()}
        </Box>
    );
}

export default ExerciseBuilderSelector;


