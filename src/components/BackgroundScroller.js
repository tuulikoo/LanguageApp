import { useEffect, useState } from "react";

const svgList = [
    "abstrakt-design-132.png",
    "abstrakt-design-332.png",
    "abstrakt-design-458.png",
];
/**
 * BackgroundScroller component for creating a parallax scrolling effect with SVG images.
 * It listens to the window scroll event and adjusts the position of SVG images accordingly.
 *
 * @component
 * @example
 * return (
 *   <BackgroundScroller />
 * )
 *
 * @returns {React.ReactElement} A React component that renders a full-screen, absolute positioned
 * container with a series of SVG images. The images move at different speeds as the user scrolls,
 * creating a parallax effect.
 */

const BackgroundScroller = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        const speedFactor = 0.02;
        const newScrollY = window.scrollY * speedFactor;
        setScrollY(newScrollY);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const backgroundStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(240, 248, 255, 1) 100%)",
        zIndex: -2,
    };

    return (
        <div style={backgroundStyle}>
            {svgList.map((svg, index) => {
                const baseOffset = index * 100;
                return (
                    <div
                        key={svg}
                        style={{
                            position: "absolute",
                            top: `${baseOffset - 39 - scrollY * (index + 1)}vh`,
                            [index % 2 === 0 ? "left" : "right"]: 0,
                            width: "50%",
                            height: "100%",
                            backgroundImage: `url('/svg/${svg}')`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            transition: "background 0.3s ease-in-out",
                            zIndex: -1,
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

export default BackgroundScroller;
