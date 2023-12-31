import ExerciseBuilder from "./ExerciseBuilder";
import ImageExerciseBuilder from "./ImageExerciseBuilder";
import { Box } from "@mui/system";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import styles from "../../../styles/ExerciseBuilderSelector.module.scss";
/**
 * ExerciseBuilderSelector is a component that allows users to select and manage different types of exercises, such as listening and image-based exercises.
 * It provides a dropdown menu to choose an exercise type and dynamically renders the appropriate exercise builder component based on the selection.
 * The component makes API calls to fetch necessary data for the selected exercise type.
 *
 * @component
 * @example
 * return (
 *   <ExerciseBuilderSelector />
 * )
 *
 * @returns {React.ReactElement} A React component that renders a selector for different exercise builders.
 * Depending on the user's selection, it displays the corresponding exercise builder,
 * which provides specific functionalities for creating and managing exercises of that type.
 */

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
                .then((response) => response.json())
                .then((data) => setFiles(data))
                .catch((error) =>
                    console.error("Error fetching exercise files:", error)
                );
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
                <InputLabel id="exercise-select-label">
                    Choose exercise
                </InputLabel>
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
};

export default ExerciseBuilderSelector;
