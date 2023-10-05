import styles from "@/styles/Hero.module.scss";

const Hero = () => {
    return (
        <div className={styles.hero_container}>
            <img
                src="https://static.vecteezy.com/system/resources/previews/014/000/111/non_2x/children-with-school-bus-in-cartoon-style-free-vector.jpg"
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
