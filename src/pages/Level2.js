import React, { useEffect, useState } from 'react';
import styles from "../styles/Level2.module.scss";
import fruits from "../utils/wordlists/fruits_level2.json";
import animals from "../utils/wordlists/animals_level2.json";
import {textToSpeech} from '../utils/mimicApi';

function Level2 () {
    const [idx, setIdx] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState(0);
    const [itemsJson, setItemJson]=useState(fruits);
    const [isFinal, setIsFinal]=useState(false);

    const nextWord=()=>{
        setIdx(idx+1);
        setError(0);
        setIsVisible(false);

        document.querySelectorAll('img').forEach((image) => {
            image.className = 'show';
        });

        document.getElementById("info").textContent="";
        if(idx == 7){
            setIdx(0);
            setIsFinal(true);
            document.getElementById("word").textContent="";
            document.getElementById("button").className="hidden";
            textToSpeech("Great job");
        }

    }

    const onClick = (e) => {

        if(idx == e.target.id){
            document.getElementById("info").textContent="Woooooow!";
            setIsVisible(true);
        } else {
            document.getElementById("info").textContent="Nice try";

            e.target.classList.add("hidden");
            document.getElementById("info").textContent="Nice try!";
            setError(error+1);
            setIsVisible(false);

            if(error>1 && e.target.id != idx){
                setIsVisible(true);
                document.getElementsByName("img").className = "show";
            }
        }
    }

    const handleSpeakButtonClick = (text) => {
        // Speak the correct word using the textToSpeech function
        text? textToSpeech(text): textToSpeech("Great job");
    };

        return (<>
            <div className={styles.container} id="container">
                <p className={styles.title}> Choose the right image:</p>
                <p className={styles.word} id="word" onChange={handleSpeakButtonClick(itemsJson[idx].eng)}>{itemsJson[idx].eng} </p>
                {!isFinal ?(<div className={styles.img_container} className={isVisible ? 'hidden' : 'show'} id="threeImg">
                    <a onClick={(e)=>onClick(e)} >
                    <img src={itemsJson[idx+1].imageUrl} alt={itemsJson[idx+1].fin} width={150} id={idx+1}
                    />
                    </a>
                    <a onClick={(e)=>onClick(e)}>
                    <img src={itemsJson[idx].imageUrl} alt={itemsJson[idx].fin} width={150}  id={idx}
                    />
                    </a>
                    <a onClick={(e)=>onClick(e)}>
                    <img src={itemsJson[idx+2].imageUrl} alt={itemsJson[idx+2].fin} width={150} height={100}
                    id={idx+2}/>
                    </a>
                    </div>):
                    <img src="https://png.pngtree.com/png-vector/20230213/ourmid/pngtree-great-job-labels-for-motivation-png-image_6596463.png" alt="Great job"/>}
                <p id="info"></p>
                <div id={styles.correct} className={isVisible ? 'show' : 'hidden'}>
                <p >corrent answer is: <span className={styles.correct_text}>{itemsJson[idx].fin}</span></p>
                <img src={itemsJson[idx].imageUrl} width="350px" className={styles.correctImg}/>
                </div>

                <button type="button" id="button" className={styles.nextBtn} onClick={()=>nextWord()}>Seuraava sana</button>
            </div>
        </>)
    
}

export default Level2;