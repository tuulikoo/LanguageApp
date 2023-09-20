import React, { useState, useEffect } from 'react';
import styles from '../styles/Admin.ExerciseBuilder.module.scss';
import button from '@mui/material/button';

const ExerciseBuilder = () => {
    const [listeningData, setListeningData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [newWord, setNewWord] = useState('');

    useEffect(() => {
        fetch('/api/words')
            .then((res) => res.json())
            .then((data) => setListeningData(data));
    }, []);

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
        fetch('/api/words', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category: selectedCategory, word: newWord }),
        })
            .then(() => {
                setListeningData((prevData) => ({
                    ...prevData,
                    [selectedCategory]: [...prevData[selectedCategory], newWord],
                }));
                setNewWord('');
            });
    };
    const handleDeleteSelectedWords = () => {
        const deleteRequests = selectedItems.map(word =>
            fetch('/api/words', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoryToDelete: selectedCategory, wordToDelete: word }),
            })
        );

        Promise.all(deleteRequests).then(() => {
            setListeningData(prevData => ({
                ...prevData,
                [selectedCategory]: prevData[selectedCategory].filter(word => !selectedItems.includes(word))
            }));
            setSelectedItems([]); // Clear the selected items
        });
    };

    return (
        <div className={styles.exerciseBuilder}>
            <select onChange={handleCategoryChange}>
                <option value="">Select a Category</option>
                {Object.keys(listeningData).map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>



            <div className={styles.categoryDisplay}>
                {selectedCategory && listeningData[selectedCategory]?.map((item) => (
                    <button
                        key={item}
                        onClick={() => handleItemClick(item)}
                        className={selectedItems.includes(item) ? styles.selected : ''}
                        onDoubleClick={() => handleItemClick(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>


            {selectedItems.length > 0 && (
                <div className={styles.deleteSelected}>
                    <button onClick={handleDeleteSelectedWords}>
                        Delete
                    </button>
                </div>
            )}
            {selectedCategory && (
                <div className={styles.addWord}>
                    <input value={newWord} onChange={(e) => setNewWord(e.target.value)} placeholder="Add a new word" />
                    <button onClick={handleAddWord}>Add Word</button>
                </div>
            )}
        </div>

    );
};
export default ExerciseBuilder;

