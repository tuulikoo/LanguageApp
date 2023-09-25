import styles from "../styles/Level2.module.scss";
import itemsJson from "../utils/wordlists/fruits.json";
import {Component} from "react";

class Level2 extends Component {
    state = {
        idx: 0,
        isVisible: false,
        error: 0,
        random1:Math.random() * (5 - 1) + 1,
        random2:Math.random() * (10 - 5) + 5,
    }
    nextWord=()=>{
        this.setState({
            idx: state.idx+=1,
            error:0,
            isVisible:false,
        })

        document.querySelectorAll('img').forEach((image) => {
            image.className = 'show';
        });
        document.getElementById("info").textContent="";
    }

    onClick = (e) => {
        const items = this.state.items;
        const idx = this.state.idx;

        if(state.idx == e.target.id){
            document.getElementById("info").textContent="Woooooow!";
            this.setState({isVisible:true});
            // const leftItems =items.filter(item=> item.id !== idx)
        } else {
            document.getElementById("info").textContent="Nice try";

            e.target.classList.add("hidden");
            document.getElementById("info").textContent="Nice try!";
            this.setState({error:state.error+=1, isVisible:false});

            if(this.state.error ===2){
                this.setState({isVisible:true});
                document.getElementsByName("img").className = "show";
            }
        }
    }

    render() {
        const {idx,isVisible,random1,random2} = this.state;
        const {imgUrl, fin, eng} = itemsJson[idx];

        return (<>
            <div className={styles.container}>
                <p className={styles.title}> Valitse oikea kuva:</p>
                <p className={styles.word}>{itemsJson[idx].eng}</p>
                <div className={styles.img_container}>
                    <a onClick={(e)=>this.onClick(e)} >
                        <img src={itemsJson[idx+1].imageUrl} alt={itemsJson[idx+1].fin} width={150} id={idx+1}
                             />
                    </a>
                    <a onClick={(e)=>this.onClick(e)}>
                        <img src={itemsJson[idx].imageUrl} alt={itemsJson[idx].fin} width={150}  id={idx}
                             />
                    </a>
                    <a onClick={(e)=>this.onClick(e)}>
                        <img src={itemsJson[idx+2].imageUrl} alt={itemsJson[idx+2].fin} width={150} height={100}
                             id={idx+2}/>
                    </a>


                </div>
                <p id="info"> </p>
                <div id={styles.correct} className={isVisible ? 'show' : 'hidden'}>
                <p >corrent answer is: <span className={styles.correct_text}>{itemsJson[idx].fin}</span></p>
                <img src={itemsJson[idx].imageUrl} width="350px" className={styles.correctImg}/>
                </div>
                <button type="button" className={styles.nextBtn} onClick={()=>this.nextWord()}>Seuraava sana</button>
            </div>
        </>)
    }
}

export default Level2;