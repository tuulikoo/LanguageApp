import React, { useState, useEffect } from 'react';
import Game4Component from '../components/Game4Component';
import Game2Component from '../components/Game2Component';

function Page1() {
    const [lastLevel, setLastLevel] = useState(1);

    // Define the levels at which Game4 and Game2 are active
    const game4Levels = [1, 3, 5];
    const game2Levels = [2, 4, 6];

    const handleLevelCompletion = () => {
        if (lastLevel < 7) {
            setLastLevel(lastLevel + 1);
        } else {
            setLastLevel(1);
        }
    };

    useEffect(() => {
        async function fetchUserLastLevel() {
            try {
                const response = await fetch('/api/user'); // Adjust the API endpoint as needed
                if (response.ok) {
                    const data = await response.json();
                    if (data.lastLevel) {
                        setLastLevel(data.lastLevel); // Update lastLevel based on the fetched data
                    }
                } else {
                    throw new Error('Failed to fetch user lastLevel');
                }
            } catch (error) {
                console.error('Error fetching user lastLevel:', error.message);
            }
        }

        fetchUserLastLevel();
    }, []);

    let componentToRender = null;

    if (game4Levels.includes(lastLevel)) {
        componentToRender = (
            <Game4Component
                lastLevel={lastLevel}
                onLevelCompletion={handleLevelCompletion}
            />
        );
    } else if (game2Levels.includes(lastLevel)) {
        componentToRender = (
            <Game2Component
                lastLevel={lastLevel}
                onLevelCompletion={handleLevelCompletion}
            />
        );
    } else {
        // Handle the case when there is no matching component for the current lastLevel
        componentToRender = <div>No matching component found for lastLevel {lastLevel}</div>;
    }

    return <div>{componentToRender}</div>;
}

export default Page1;
