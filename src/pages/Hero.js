import styles from '../styles/Hero.module.css';

const Hero = () => {
    return (
        <div className={styles.hero_container}>
            <div className={styles.content_overlay}>
                <h1 className={styles.hero_title}>
                    <span className={styles.primary_text}>Aloita</span><br />
                    <span className={styles.secondary_text}>Kielen Opiskelu</span>
                </h1>
                <a href="Levels" className={styles.hero_button}>
                    Tästä
                </a>
            </div>
        </div>
    );
}
export default Hero;

