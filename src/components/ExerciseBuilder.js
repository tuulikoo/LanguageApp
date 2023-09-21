import React, { useState, useEffect } from "react";
import styles from "../styles/Admin.ExerciseBuilder.module.scss";

const ExerciseBuilder = () => {
    const [data, setData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [newWord, setNewWord] = useState("");
    const [availableFiles, setAvailableFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState("");

    useEffect(() => {
        // Fetch available JSON files
        fetch("/api/fileHelper")
            .then((res) => res.json())
            .then((files) => setAvailableFiles(files));

        // Fetch data for the default file
        fetch(`/api/words?file=${selectedFile}`)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);
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
            setNewWord("");
        });
    };
    const handleDeleteSelectedWords = () => {
        // Make sure to include the selected file in all API requests related to words
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
            }),
        );

        Promise.all(deleteRequests).then(() => {
            setData((prevData) => ({
                ...prevData,
                [selectedCategory]: prevData[selectedCategory].filter(
                    (word) => !selectedItems.includes(word),
                ),
            }));
            setSelectedItems([]); // Clear the selected items
        });
    };

    return (
        <div className={styles.exerciseBuilder}>
            <select onChange={handleFileChange} value={selectedFile}>
                {availableFiles.map((file) => (
                    <option key={file} value={file}>
                        {file}
                    </option>
                ))}
            </select>
            <select onChange={handleCategoryChange}>
                <option value="">Select a Category</option>
                {Object.keys(data).map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <div className={styles.categoryDisplay}>
                {selectedCategory &&
                    data[selectedCategory]?.map((item) => (
                        <button
                            key={item}
                            onClick={() => handleItemClick(item)}
                            className={selectedItems.includes(item) ? styles.selected : ""}
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
