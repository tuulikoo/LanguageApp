import styles from "@/styles/Hero.module.css";

const Hero = () => {
    return (
        <div className={styles.hero_container}>
            <img
                src="https://images.unsplash.com/photo-1610484826917-0f101a7bf7f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                className={styles.hero_img}
                alt="hero image"
            />

            <h1 className={`font-custom ${styles.hero_title}`}>
                Aloita kielen opiskelu<br />
            </h1>
            <a href="MainPage.js" className={styles.hero_button}>
                TÄSTÄ
            </a>
        </div>
    );
}
export default Hero;