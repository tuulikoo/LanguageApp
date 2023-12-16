import React, { useEffect, useState } from "react";
import styles from "../../../styles/Admin.ExerciseBuilder.module.scss";

/**
 * ImageExerciseBuilder is a component for creating and managing image-based language learning exercises.
 * It allows administrators to select a file, add new image-based items with English and Finnish words, and view a list of existing items.
 * The component provides functionalities to submit new items to a database, preview images, and delete existing items.
 *
 * @component
 * @example
 * return (
 *   <ImageExerciseBuilder />
 * )
 *
 * @returns {React.ReactElement} A React component that renders an interface for building and managing image-based exercises.
 * It includes a file selector, input fields for image URLs and words, and a list of current items with options to add new ones or delete existing ones.
 */

const ImageExerciseBuilder = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [eng, setEng] = useState("");
    const [fin, setFin] = useState("");
    const [items, setItems] = useState([]);
    const [selectedFile, setSelectedFile] = useState("");
    const [availableFiles, setAvailableFiles] = useState([]);

    useEffect(() => {
        fetch("/api/fileHelper?prefix=img")
            .then((response) => response.json())
            .then((files) => setAvailableFiles(files))
            .catch((error) => console.error("Error fetching files:", error));
    }, []);

    useEffect(() => {
        if (selectedFile) {
            fetch(`/api/images?file=${selectedFile}`)
                .then((response) => response.json())
                .then((data) => setItems(data))
                .catch((error) =>
                    console.error("Error fetching items:", error)
                );
        }
    }, [selectedFile]);

    const handleSubmit = () => {
        fetch(`/api/images?file=${selectedFile}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl, eng, fin }),
        });
        fetch(`/api/addImgDB`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl, eng, fin }),
        })
            .then((response) => response.json())
            .then((newItem) => {
                setItems((prevItems) => [...prevItems, newItem]);
                setImageUrl("");
                setEng("");
                setFin("");
            })
            .catch((error) => console.error("Error adding item:", error));
    };

    const handleDelete = async (id) => {
        try {
            const [dbResponse, fileResponse] = await Promise.all([
                fetch(`/api/images?file=${selectedFile}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id }),
                }),
                fetch(`/api/deleteImgDB`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id }),
                }),
            ]);

            if (dbResponse.ok && fileResponse.ok) {
                setItems((prevItems) =>
                    prevItems.filter((item) => item.id !== id)
                );
            } else {
                throw new Error("Error deleting item.");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <div className={styles.exerciseBuilder}>
            <select
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.value)}
            >
                <option value="">Select a file</option>
                {availableFiles.map((file) => (
                    <option key={file} value={file}>
                        {file.replace(".json", "").replace("img", "")}
                    </option>
                ))}
            </select>

            <div>
                <label>
                    Image URL:
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </label>
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Preview"
                        className={styles.imagePreview}
                    />
                )}
            </div>

            <div>
                <label>
                    English Word:
                    <input
                        type="text"
                        value={eng}
                        onChange={(e) => setEng(e.target.value)}
                    />
                </label>
            </div>

            <div>
                <label>
                    Finnish Word:
                    <input
                        type="text"
                        value={fin}
                        onChange={(e) => setFin(e.target.value)}
                    />
                </label>
            </div>

            <button onClick={handleSubmit}>Submit</button>

            <div className={styles.itemsList}>
                {items.map((item) => (
                    <div key={item.id} className={styles.item}>
                        <img src={item.imageUrl} alt={item.eng} width={50} />
                        <span>
                            {item.eng} / {item.fin}
                        </span>
                        <button onClick={() => handleDelete(item.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageExerciseBuilder;
