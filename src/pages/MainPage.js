import Hero from "./Hero.js";
import Levels from "./Levels.js";
import Carousel from "./Carousel.js";
import Footer from "./Footer.js";
import BackgroundScroller from "../components/BackgroundScroller.js";


const MainPage = () => {
    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <Hero />
            <Levels />
            <Carousel />
            <Footer />
        </div>
    );
};

export default MainPage;

