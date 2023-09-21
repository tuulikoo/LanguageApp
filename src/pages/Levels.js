import styles from "@/styles/Levels.module.css";
import "./Level2";

const Levels = () => {
    return <div className={styles.levels_container}>
        <h1>🄻🄴🅅🄴🄻🅂 🅆🄴 🄷🄰🅅🄴</h1>
        <ul className={styles.levels_list}>
            <li className={styles.levels_item}>
                <p>Tab 1</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                    autem ea facilis fugiat laboriosam.
                </p>
            </li>`
            <li className={styles.levels_item}>

                <p>Tab 2</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                    autem ea facilis fugiat laboriosam.
                </p>
            </li>
            <li className={styles.levels_item}>
                <p>Tab 3</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                    autem ea facilis fugiat laboriosam.
                </p>
            </li>
        </ul>
    </div>
}

export default Levels;