import { useEffect, useState } from 'react';
import styles from '../styles/BackgroundScroller.module.scss';
const svgList = [
    'undraw_bibliophile_re_xarc.svg',
    'undraw_reading_re_29f8.svg',
    'undraw_ride_a_bicycle_re_6tjy.svg',
];
const BackgroundScroller = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        const speedFactor = 0.04;
        const newScrollY = window.scrollY * speedFactor;
        setScrollY(newScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div style={{ position: "absolute", top: 0, left: 10, width: '100%', height: '90%' }}>
            {svgList.map((svg, index) => {

                const baseOffset = index * 130;

                return (
                    <div
                        key={svg}
                        style={{
                            position: 'absolute',
                            top: `${baseOffset - scrollY * (index + 1)}vh`,
                            [index % 2 === 0 ? 'left' : 'right']: 0,
                            width: '50vw',
                            height: '100vh',
                            backgroundImage: `url('/svg/${svg}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'background 0.3s ease-in-out',
                            zIndex: -1
                        }}
                    ></div>
                );
            })}
        </div>
    );
}

export default BackgroundScroller;

