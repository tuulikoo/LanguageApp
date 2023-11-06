import styles from '../styles/Hero.module.css';
import { useTranslation } from 'react-i18next';
//spinner from mui
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';



const Hero = () => {

    const { t } = useTranslation();
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isloading) {
        return (
            <div className={styles.spinner}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className={styles.hero_container}>
            <div className={styles.content_overlay}>
                <h1 className={styles.hero_title}>
                    <span className={styles.primary_text}>Aloita</span><br />
                    <span className={styles.secondary_text}>Kielen Opiskelu</span>
                </h1>
                <a href="Levels" className={styles.hero_button}>
                    {t('heroButton')}
                </a>
            </div>
        </div>
    );
}
export default Hero;

