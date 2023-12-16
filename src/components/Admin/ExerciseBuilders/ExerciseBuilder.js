import React, { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import { InputLabel } from "@mui/material";
import styles from "../../../styles/Admin.ExerciseBuilder.module.scss";
/**
 * ExerciseBuilder is a component designed for managing language learning exercises.
 * It allows administrators to choose a file and a category within that file, view and edit items in the category,
 * add new words, and delete selected words. The component fetches and updates exercise data through API calls.
 *
 * @component
 * @example
 * return (
 *   <ExerciseBuilder />
 * )
 *
 * @returns {React.ReactElement} A React component that renders an interface for building and managing language exercises.
 * It includes functionalities to select files and categories, display items in the selected category,
 * and provides options to add or delete words. It interacts with server-side APIs to fetch and update exercise data.
 */

const ExerciseBuilder = () => {
    const [data, setData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [newWord, setNewWord] = useState("");
    const [availableFiles, setAvailableFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState("");

    useEffect(() => {
        // Fetch available JSON files
        fetch("/api/fileHelper?prefix=listening")
            .then((res) => res.json())
            .then((files) => setAvailableFiles(files));

        // Fetch data for the default file
        fetch(`/api/words?file=${selectedFile}`)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [selectedFile]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.value);
        setSelectedCategory(null); // Reset category
        fetch(`/api/words?file=${e.target.value}`)
            .then((res) => res.json())
            .then((data) => setData(data));
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedItems([]);
    };

    const handleItemClick = (item) => {
        setSelectedItems((prevItems) => {
            if (prevItems.includes(item)) {
                return prevItems.filter((prevItem) => prevItem !== item);
            } else {
                return [...prevItems, item];
            }
        });
    };
    const handleAddWord = () => {
        fetch(`/api/words?file=${selectedFile}`, {
            // Include the file in request
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category: selectedCategory, word: newWord }),
        }).then(() => {
            setData((prevData) => ({
                ...prevData,
                [selectedCategory]: [...prevData[selectedCategory], newWord],
            }));
            fetch("/api/updateDatabase", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: selectedCategory,
                    word: newWord,
                }),
            });
            setNewWord("");
        });
    };
    const handleDeleteSelectedWords = async () => {
        console.log("delete pushed");

        try {
            const deleteRequests = selectedItems.map((word) =>
                fetch(`/api/words?file=${selectedFile}`, {
                    // Include the file in request
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        categoryToDelete: selectedCategory,
                        wordToDelete: word,
                    }),
                })
            );

            const deleteDatabaseRequests = selectedItems.map((word) =>
                fetch(`/api/deleteDB?file=${selectedFile}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        categoryToDelete: selectedCategory,
                        wordToDelete: word,
                    }),
                })
            );

            Promise.all([...deleteRequests, ...deleteDatabaseRequests]).then(
                () => {
                    setData((prevData) => {
                        if (prevData[selectedCategory]) {
                            return {
                                ...prevData,
                                [selectedCategory]: prevData[
                                    selectedCategory
                                ].filter(
                                    (word) => !selectedItems.includes(word)
                                ),
                            };
                        }
                        return prevData; // Category not found, return unchanged data
                    });

                    setSelectedItems([]); // Clear the selected items
                }
            );
        } catch (error) {
            console.error("Error in handleDeleteSelectedWords:", error);
        }
    };

    return (
        <div className={styles.exerciseBuilder}>
            <InputLabel id="ExerciseBuilder-select-label">
                Choose file
            </InputLabel>
            <Select
                className={styles.select}
                onChange={handleFileChange}
                labelId="ExerciseBuilder-select-label"
                id="ExerciseBuilder-select"
                variant="outlined"
                value={selectedFile}
            >
                {availableFiles.map((file) => (
                    <MenuItem key={file} value={file}>
                        {file.replace(".json", "")}
                    </MenuItem>
                ))}
            </Select>
            <InputLabel id="ExerciseBuilder-select-label">
                Choose category
            </InputLabel>
            <Select
                className={styles.select}
                onChange={handleCategoryChange}
                labelId="ExerciseBuilder-select"
                id="ExerciseBuilder-select"
                variant="outlined"
                value={selectedCategory}
            >
                {Object.keys(data).map((category) => (
                    <MenuItem key={category} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </Select>

            <div className={styles.categoryDisplay}>
                {selectedCategory &&
                    data[selectedCategory].map((item) => (
                        <button
                            key={item}
                            onClick={() => handleItemClick(item)}
                            className={
                                selectedItems.includes(item)
                                    ? styles.selected
                                    : ""
                            }
                            onDoubleClick={() => handleItemClick(item)}
                        >
                            {item}
                        </button>
                    ))}
            </div>

            {selectedItems.length > 0 && (
                <div className={styles.deleteSelected}>
                    <button onClick={handleDeleteSelectedWords}>Delete</button>
                </div>
            )}
            {selectedCategory && (
                <div className={styles.addWord}>
                    <input
                        value={newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                        placeholder="Add a new word"
                    />
                    <button onClick={handleAddWord}>Add Word</button>
                </div>
            )}
        </div>
    );
};
export default ExerciseBuilder;
