import styles from "@/styles/Levels.module.css";
import "./Level2";

const Levels = () => {
    return <div className={styles.levels_container}>
        <h1>🄻🄴🅅🄴🄻🅂 🅆🄴 🄷🄰🅅🄴</h1>
        <ul className={styles.levels_list}>
            <li className={styles.levels_item}>
                <p>Taso 1</p>
                <p>
                    Hyvä tapa testata oppimiasi sanoja. Sinun on valittava oikea englanninkielinen sana kuvasta. Toivottavasti voit arvata ensimmäisen kerran ja saada suurimman määrän pisteitä.
                </p>
            </li>`
            <li className={styles.levels_item}>

                <p>Taso 2</p>
                <p>
                    Toinen tapa tarkistaa oppimasi sanat. Sinun on valittava kuva englanninkielisen sanan perusteella. Toivottavasti voit arvata ensimmäisen kerran ja saada suurimman määrän pisteitä.
                </p>
            </li>
            <li className={styles.levels_item}>
                <p>Taso 3</p>
                <p>
                    Toinen tapa tarkistaa oppimasi sanat. Sinun täytyy kirjoittaa koko sana muistista. Toivottavasti voit arvata ensimmäisen kerran ja saada suurimman määrän pisteitä.
                </p>
                <p> Tsemppiä!</p>
                
            </li>
        </ul>
    </div>
}

export default Levels;