import styles from "@/styles/Levels.module.css";
import "./Level2";

const Levels = () => {
    return (
        <div className={`${styles.levels_container} font-custom`}>
            <h1 className="font-custom">Levels We Have</h1>
            <ul className={styles.levels_list}>
                <li className={styles.levels_item}>
                    <p className="font-custom">Tab 1</p>
                    <p className="font-custom">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                        autem ea facilis fugiat laboriosam.
                    </p>
                </li>
                <li className={styles.levels_item}>
                    <p className="font-custom">Tab 2</p>
                    <p className="font-custom">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                        autem ea facilis fugiat laboriosam.
                    </p>
                </li>
                <li className={styles.levels_item}>
                    <p className="font-custom">Tab 3</p>
                    <p className="font-custom">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                        autem ea facilis fugiat laboriosam.
                    </p>
                </li>
            </ul>
        </div>
    );
}

export default Levels;