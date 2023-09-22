import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios or your preferred HTTP library
import styles from '../styles/UserPointsComponent.module.css'; // Import the CSS module

function UserPointsComponent() {
    const [userPoints, setUserPoints] = useState(null);

    useEffect(() => {
        // Function to fetch user points from your database
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

    // Function to display rewards based on user points
    const showRewards = () => {
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
        ];

        // Check if userPoints is not available yet (initial state)
        if (userPoints === null) {
            return null;
        }

        // Check if the user has 0 points and display "reward0"
        if (userPoints === 0) {
            return (
                <div className={styles.rewardsContainer}>
                    <h3>Your Rewards</h3>
                    <img src={rewards[0].src} alt={`Reward ${rewards[0].id}`} />
                </div>
            );
        }

        const maxRewardsToShow = Math.min(Math.floor(userPoints / 10), rewards.length);
        const rewardImages = rewards.slice(1, maxRewardsToShow + 1).map((reward) => (
            <img key={reward.id} src={reward.src} alt={`Reward ${reward.id}`} />
        ));

        return (
            <div className={styles.rewardsContainer}>
                <h3>Your Rewards</h3>
                {rewardImages}
            </div>
        );
    };

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
    };

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
                <button className={styles.rewardsButton} onClick={showRewards}>View Rewards</button>
            </div>
            {showRewards()} {/* Display rewards when the "View Rewards" button is clicked */}
        </div>
    );
}

export default UserPointsComponent;
