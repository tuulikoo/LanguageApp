import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from "react-responsive-carousel";
import items from "./Items.json";
import styles from "../styles/Carousel.module.css";

export default function ResponsiveCarousel() {
    return (

        <div className={styles.carousel_container}>
            <h1 className={styles.carousel_title}>🅁🄴🅅🄸🄴🅆🅂</h1>
            <div className={styles.container}>
                <Carousel
                    showArrows={true}
                    autoPlay={true}
                    showIndicators={true}
                    infiniteLoop={true}
                    dynamicHeight={false}
                    className={styles.mySwiper}
                >
                    {items.map(({id, imageUrl, title, text}) => (
                        <div key={id} className={styles.swipItem}>
                            <div className={styles.imgBox}>
                                <img src={imageUrl} alt="slides"/>
                            </div>
                            <div className={styles.detail}>
                                <h2>{title}</h2>
                                <p>{text}</p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>

    );
}