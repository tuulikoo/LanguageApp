import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import items from "../utils/wordlists/carousel.json";
import styles from "../styles/Carousel.module.scss";

export default function ResponsiveCarousel() {
    return (
        <div className={styles.carousel_container}>
            <div className={styles.container}>
                <Carousel
                    showArrows={true}
                    autoPlay={true}
                    showIndicators={true}
                    infiniteLoop={true}
                    dynamicHeight={false}
                    className={styles.mySwiper}
                    swipeable={true}
                >
                    {items.map(({ id, imageUrl, title, text }) => (
                        <div key={id} className={styles.swipItem}>
                            <div className={styles.imgBox}>
                                <img src={imageUrl} alt="slides" />
                            </div>
                            <div className={styles.detail}>
                                <h2 className="font-custom">{title}</h2>
                                <p className="font-custom">{text}</p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
