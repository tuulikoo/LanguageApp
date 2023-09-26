import styles from "@/styles/Levels.module.css";
import "./Level2";

const Levels = () => {
    return <div className={styles.levels_container}>
        <h1>🄻🄴🅅🄴🄻🅂 🅆🄴 🄷🄰🅅🄴</h1>
        <ul className={styles.levels_list}>
            <li className={styles.levels_item}>
                <p>Oppimisen taso</p>
                <p>
                    oppiminen flashcards:ien mukaan, mistä saat niin sanan suomeksi, kuin englanniksi. Sillä tasolla on hyvä aloittaa englannin kielen opiskelun.
                </p>
            </li>`
            <li className={styles.levels_item}>

                <p>Level 1</p>
                <p>
                    lapsille helppo tehtävä kuvan mukaan keksiä, kumpi sanoista on oikein. Se on hyvä tapa tarkistaa, miten onnistui ensimmäisen tason oppiminen ja muistatko sanoja hyvin. Saat pisteita, jos onnistuu ensimmäisesta kerrasta oikeasti.
                </p>
            </li>
            <li className={styles.levels_item}>
                <p>Level 2</p>
                <p>
                    nyt on tärkeä valita oikea kuva, mitä tarkoittaa lukea sana englanniksi ja valita oikea kuva. Saat pisteita, jos onnistuu ensimmäisesta kerrasta oikeasti.
                </p>
            </li>
        </ul>
    </div>
}

export default Levels;