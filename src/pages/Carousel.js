import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import items from "../utils/wordlists/carousel.json";
import styles from "../styles/Carousel.module.scss";


export default function ResponsiveCarousel() {
    return (
        <div className={styles.carousel_container}>
            <h1 className={styles.carousel_title}></h1>
            <div className={styles.container}>
                <Carousel
                    showArrows={false}
                    autoPlay={true}
                    showIndicators={false}
                    infiniteLoop={true}
                    dynamicHeight={false}
                    showStatus={false}
                    showThumbs={false}
                    interval={10000}
                    className={styles.mySwiper}
                >
                    {items.map(({ id, quote_finnish, quote_english }) => (
                        <div key={id} className={styles.swipItem}>
                            <div className={styles.detail}>
                                <h2>{quote_finnish}</h2>
                                <p>{quote_english}</p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
