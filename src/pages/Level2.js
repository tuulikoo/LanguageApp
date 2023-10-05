import React, { useCallback, useEffect, useState } from 'react';
import styles from "../styles/Level2.module.scss";
import fruits from "../utils/wordlists/fruits_level2.json";
import animals from "../utils/wordlists/animals_level2.json";
import school from "../utils/wordlists/school_level2.json";
import { textToSpeech } from '../utils/mimicApi';
import { useUser } from '@/utils/userContext';

const Level2 = () => {
    const [idx, setIdx] = useState(0);
    const { user } = useUser();
    const initialUserPoints = user ? user.userPoints : 0;
    const [userPointsState, setUserPointsState] = useState(initialUserPoints);
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState(0);
    const [itemsJson, setItemJson] = useState(fruits);
    const [isFinal, setIsFinal] = useState(false);
    const [points, setPoints] = useState(0);

    //update points in database
    const updateUserPoints = useCallback(async () => {

        const pointsToAdd = 1;
        try {
            const response = await fetch('/api/updatePoints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, newPoints: pointsToAdd })
            });

            if (response.ok) {
                const data = await response.json();
                setUserPointsState(data.updatedPoints);

            } else {
                throw new Error('Failed to update points');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    }, [user?.id]);

    useEffect(() => {
        if (user && user.userPoints) {
            setUserPointsState(user.userPoints);
        }
    }, [updateUserPoints, user]);
    //by clicking it shows the next word
    const nextWord = () => {

        console.log("points " + points);
        console.log(error);

        document.getElementById("points").textContent = "";
        document.getElementById("points").textContent = "Now you have " + points + " points already!";
        setIdx(idx + 1);
        setError(0);
        setIsVisible(false);

        document.querySelectorAll('img').forEach((image) => {
            image.className = 'show';
        });
        document.getElementById("info").textContent = "";

        //because user sees idx pic ,so index 9 is the last one pic to show to user
        if (idx == 9) {
            setIdx(0);
            setIsFinal(true);
            document.getElementById("word").textContent = "";
            document.getElementById("button").className = "hidden";
            document.getElementById("points").textContent = "";
            //The level is over
            textToSpeech("Great job");
        }
    }

    const onClick = async (e) => {
        //if user is not correct
        if (idx != e.target.id) {
            setError(error + 1);
            setIsVisible(false);
            document.getElementById("info").textContent = "Nice try";
            e.target.classList.add("hidden");
        }
        //if user is correct, he got 3 points
        if (idx == e.target.id) {
            document.getElementById("info").textContent = "Woooooow!";

            error == 1 ? setPoints(points + 2) : '';
            error == 0 ? setPoints(points + 3) : '';
            setIsVisible(true);
        }
        await updateUserPoints();
    }

    const handleSpeakButtonClick = (text) => {
        // Speak the correct word using the textToSpeech function
        text ? textToSpeech(text) : textToSpeech("Great job");
    };

    return (<>

        <div className={styles.container} id="container">
            <p className={styles.title}> Choose the right image:</p>
            <p className={styles.word} id="word"
                onChange={handleSpeakButtonClick(itemsJson[idx].eng)}>{itemsJson[idx].eng} </p>
            {/*depends on how much words we have to show, they are showing or just image "Great Job!"*/}
            {/*class changes depending do the user choosed the right image or not and the wrong one is hidden*/}
            {!isFinal ? (<div className={isVisible ? 'hidden' : 'show'} id="threeImg">
                <a onClick={(e) => onClick(e)} id={idx + 1}>
                    <img src={school[idx].imageUrl} alt={school[idx].fin} width={150} id={idx + 1}
                    />
                </a>
                <a onClick={(e) => onClick(e)} id={idx}>
                    <img src={itemsJson[idx].imageUrl} alt={itemsJson[idx].fin} width={150} id={idx}
                    />
                </a>
                <a onClick={(e) => onClick(e)} id={idx + 2}>
                    <img src={animals[idx].imageUrl} alt={animals[idx].fin} width={150} height={100}
                        id={idx + 2} />
                </a>
            </div>) :
                // image at the final of the game
                <img
                    src="https://png.pngtree.com/png-vector/20230213/ourmid/pngtree-great-job-labels-for-motivation-png-image_6596463.png"
                    alt="Great job" />}
            {/*place to say user how good he is playing*/}
            <p id="info"></p>
            {/*place to say user how much points he has*/}
            <p id="points" className={styles.title}></p>
            <div id={styles.correct} className={isVisible ? 'show' : 'hidden'}>
                <p>corrent answer is: <span className={styles.correct_text}>{itemsJson[idx].fin}</span></p>
                <img src={itemsJson[idx].imageUrl} width="350px" className={styles.correctImg} />
            </div>

            <button type="button" id="button" className={styles.nextBtn} onClick={() => nextWord()}>Seuraava sana
            </button>
        </div>
    </>)

}

export default Level2;
