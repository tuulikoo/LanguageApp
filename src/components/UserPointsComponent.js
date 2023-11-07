
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "../styles/UserPointsComponent.module.scss";
import { useRouter } from 'next/router'; // Import useRouter from Next.js
import { useTranslation } from 'react-i18next';

function UserPointsComponent() {
    const [userPoints, setUserPoints] = useState(null);
    const [showRewardsGrid, setShowRewardsGrid] = useState(false);
    const [selectedReward, setSelectedReward] = useState(null);

    // Get the router instance
    const router = useRouter();

    const { t } = useTranslation();

    useEffect(() => {
        const fetchUserPoints = async () => {
            try {
                const response = await axios.get('/api/user');

                if (response.status === 200) {
                    const points = response.data.userPoints;
                    setUserPoints(points);
                } else {
                    console.error('Failed to fetch user points.');
                }
            } catch (error) {
                console.error('An error occurred while fetching user points.', error);
            }
        };

        fetchUserPoints();
    }, []);

    const toggleRewardsGrid = () => {
        setShowRewardsGrid(!showRewardsGrid);
        setSelectedReward(null); // Reset selected reward when hiding the grid
    };

    const openRewardModal = (rewardId) => {
        setSelectedReward(rewardId);
    };

    const closeRewardModal = () => {
        setSelectedReward(null);
    };

    const renderRewardsGrid = () => {
        if (!showRewardsGrid) {
            return null;
        }

        const rewards = [
            { id: 0, src: 'rewards/reward0.jpg' },
            { id: 1, src: 'rewards/reward1.png' },
            { id: 2, src: 'rewards/reward2.png' },
            { id: 3, src: 'rewards/reward3.png' },
            { id: 4, src: 'rewards/reward4.png' },
            { id: 5, src: 'rewards/reward5.jpg' },
            { id: 6, src: 'rewards/reward6.png' },
            { id: 7, src: 'rewards/reward7.png' },
            { id: 8, src: 'rewards/reward8.png' },
            { id: 9, src: 'rewards/reward9.png' },
            { id: 10, src: 'rewards/reward10.png' },
            { id: 11, src: 'rewards/reward11.png' },
            { id: 12, src: 'rewards/reward12.png' },
            { id: 13, src: 'rewards/reward13.png' },
            { id: 14, src: 'rewards/reward14.png' },
            { id: 15, src: 'rewards/reward15.png' },
        ];

        const maxRewardsToShow = Math.min(Math.floor(userPoints / 10), rewards.length);

        const rewardGrid = rewards.slice(1, maxRewardsToShow + 1).map((reward) => (
            <div
                key={reward.id}
                className={styles.rewardItem}
                onClick={() => openRewardModal(reward.id)} // Open modal on click
            >
                <img src={reward.src} alt={`Reward ${reward.id}`} className={styles.rewardImage} />
            </div>
        ));

        return (
            <div className={styles.rewardsContainer}>
                <h3>{t("UPprizes2")}</h3>
                <div className={styles.rewardGrid}>{rewardGrid}</div>
                {selectedReward !== null && (
                    <div className={styles.rewardModal}>
                        <div className={styles.rewardModalContent}>
                            <span
                                className={styles.closeButton}
                                onClick={closeRewardModal}
                            >
                                &times;
                            </span>
                            <img
                                src={rewards[selectedReward].src}
                                alt={`Reward ${rewards[selectedReward].id}`}
                                className={styles.enlargedRewardImage}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    };

    let message = '';
    if (userPoints >= 200) {
        message = t("UPpoints200");
    } else if (userPoints >= 100) {
        message = t("UPpoints100");
    } else if (userPoints >= 50) {
        message = t("UPpoints50");
    } else if (userPoints >= 11) {
        message = t("UPpoints10");
    } else if (userPoints >= 1) {
        message = t("UPpoints1");
    } else {
        message = t("UPpoints0");
    }

    const handleStartPracticeClick = () => {
        // Use router to navigate to MainPage
        router.push('/MainPage');
    };

    return (
        <div className={styles.userPointsContainer}>
            <div className={styles.userPointsHeader}>
                <h2>{t("UPpoints")}</h2>
                <div className={styles.pointsVisual}>
                    <div className={styles.starIcon}>
                        <span role="img" aria-label="Star">⭐</span>
                    </div>
                    <div className={styles.pointsCount}>{userPoints}</div>
                    <div className={styles.starIcon}>
                        <span role="img" aria-label="Star">⭐</span>
                    </div>
                </div>
            </div>
            <p className={styles.motivationMessage}>{message}</p>
            <div className={styles.buttonsContainer}>
                <button className={styles.practiceButton} onClick={handleStartPracticeClick}>{t("UPstart")}</button>
                <button className={styles.rewardsButton} onClick={toggleRewardsGrid}>
                    {t("UPprizes")}
                </button>
            </div>
            {renderRewardsGrid()}
        </div>
    );
}

export default UserPointsComponent;

