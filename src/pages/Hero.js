import styles from "@/styles/Hero.module.css";

const Hero=()=>{
    return(
    <div className={styles.hero_container}>
        <img
            src="https://wallpaperaccess.com/full/759396.jpg"
            className={styles.hero_img}
         alt="hero image"/>
        <h1 className={styles.hero_title}>
            Learning Is Power<br />
        </h1>
        <a href="MainPage.js" className={styles.hero_button}>
            START
        </a>
    </div>
    )
}
export default Hero;