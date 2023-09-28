import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import items from "../utils/wordlists/carousel.json";
import styles from "../styles/Carousel.module.scss";

export default function ResponsiveCarousel() {
    return (
        <div className={styles.carousel_container}>
            <div className={styles.container}>
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    dynamicHeight={false}
                    showStatus={false}
                    showThumbs={false}
                    showIndicators={false}
                    showArrows={false}
                    stopOnHover={true}
                    interval={10000}
                    className={styles.mySwiper}
                >
                    {items.map(({ id, title, text }) => (
                        <div key={id} className={styles.swipItem}>
                            <div className={styles.imgBox}>
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
