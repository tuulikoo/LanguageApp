import { Button } from 'react-bootstrap';
import styles from '../styles/Hero.module.css';
import { useTranslation } from 'react-i18next';



const Hero = () => {

    const { t } = useTranslation();

    return (
        <div className={styles.hero_container}>
            <div className={styles.content_overlay}>
                <h1 className={styles.hero_title}>
                    <span className={styles.primary_text}>{t('startLearning')}</span><br />
                    <span className={styles.secondary_text}>{t('languageStudy')}</span>
                </h1>
                <Button href="/Levels" className={styles.hero_button}>
                    {t('heroButton')}
                </Button>

            </div>
        </div>
    );
}

export default Hero;






