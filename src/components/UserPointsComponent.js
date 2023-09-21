import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios or your preferred HTTP library

import styles from '../styles/UserPointsComponent.module.css'; // Import the CSS module

function UserPointsComponent() {
    const [userPoints, setUserPoints] = useState(0);

    useEffect(() => {
        // Function to fetch user points from your database
        const fetchUserPoints = async () => {
            try {
                const response = await axios.get('/api/getUserPoints');

                if (response.status === 200) {
                    const points = response.data.points;
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

    // Fun and motivating messages based on the user's points
    let message = '';
    if (userPoints >= 200) {
        message = 'A-M-A-Z-I-N-G! You are a superstar language learner!';
    } else if (userPoints >= 100) {
        message = 'WOW! You are crushing it! Keep up the fantastic work!';
    } else if (userPoints >= 50) {
        message = 'You are on a roll, champ! Keep going!';
    } else if (userPoints >= 11) {
        message = 'You have really been working hard. We\'re proud of you!';
    } else if (userPoints >= 1) {
        message = 'Great start! Keep practicing to earn more points!';
    } else {
        message = 'Let\'s start learning! The more you practice, the more points you\'ll earn!';
    }

    return (
        <div className={styles.userPointsContainer}>
            <div className={styles.userPointsHeader}>
                <h2>Your Points</h2>
                <div className={styles.pointsVisual}>
                    {/* Display fun visual elements based on points */}
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
            {/* Add additional UI elements or animations to make it more fun */}
            <div className={styles.buttonsContainer}>
                <button className={styles.practiceButton}>Start Practicing</button>
                <button className={styles.rewardsButton}>View Rewards</button>
            </div>
        </div>
    );
}

export default UserPointsComponent;
