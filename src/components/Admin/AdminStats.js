import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import Paper from "@mui/material/Paper";
import styles from "../../styles/Adminstats.module.scss";
/**
 * UserStats is a component for displaying statistical data of users in an admin panel.
 * It visualizes the distribution of user points and time spent in the application using bar charts.
 * The component fetches user data from an API, processes it to categorize into different ranges,
 * and then renders this data in a graphical format for easy comprehension and analysis.
 *
 * @component
 * @example
 * return (
 *   <UserStats />
 * )
 *
 * @returns {React.ReactElement} A React component that renders statistical charts for user points and time spent.
 * It displays bar charts to show the distribution of users based on points they have earned and the time they have spent using the application.
 */

function UserStats() {
    const [tempBuckets, setBuckets] = useState([]);
    const [tempTimeBuckets, setTimeBuckets] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/adminUsers");
                const users = await response.json();

                const tempBuckets = {
                    "0-10": 0,
                    "11-20": 0,
                    "21-30": 0,
                    "31-40": 0,
                    "41-50": 0,
                    "51-60": 0,
                    "61-70": 0,
                    "71-80": 0,
                    "81-90": 0,
                };
                const tempTimeBuckets = {
                    "0-10": 0,
                    "11-20": 0,
                    "21-30": 0,
                    "31-40": 0,
                    "41-50": 0,
                    "51-60": 0,
                    "61-70": 0,
                    "71-80": 0,
                    "81-90": 0,
                };

                users.forEach((user) => {
                    if (user.userPoints <= 10) {
                        tempBuckets["0-10"]++;
                    } else if (user.userPoints <= 20) {
                        tempBuckets["11-20"]++;
                    } else if (user.userPoints <= 30) {
                        tempBuckets["21-30"]++;
                    } else if (user.userPoints <= 40) {
                        tempBuckets["31-40"]++;
                    } else if (user.userPoints <= 50) {
                        tempBuckets["41-50"]++;
                    } else if (user.userPoints <= 60) {
                        tempBuckets["51-60"]++;
                    } else if (user.userPoints <= 70) {
                        tempBuckets["61-70"]++;
                    } else if (user.userPoints <= 80) {
                        tempBuckets["71-80"]++;
                    } else if (user.userPoints <= 90) {
                        tempBuckets["81-90"]++;
                    }
                });
                users.forEach((user) => {
                    let timeInMinutes = user.timeSpent / 600;
                    if (timeInMinutes <= 10) {
                        tempTimeBuckets["0-10"]++;
                    } else if (timeInMinutes <= 20) {
                        tempTimeBuckets["11-20"]++;
                    } else if (timeInMinutes <= 30) {
                        tempTimeBuckets["21-30"]++;
                    } else if (timeInMinutes <= 40) {
                        tempTimeBuckets["31-40"]++;
                    } else if (timeInMinutes <= 50) {
                        tempTimeBuckets["41-50"]++;
                    } else if (timeInMinutes <= 60) {
                        tempTimeBuckets["51-60"]++;
                    } else if (timeInMinutes <= 70) {
                        tempTimeBuckets["61-70"]++;
                    } else if (timeInMinutes <= 80) {
                        tempTimeBuckets["71-80"]++;
                    } else if (timeInMinutes <= 90) {
                        tempTimeBuckets["81-90"]++;
                    }
                });

                const formattedTimeBuckets = Object.keys(tempTimeBuckets).map(
                    (range) => ({
                        range,
                        count: tempTimeBuckets[range],
                    })
                );
                setTimeBuckets(formattedTimeBuckets);

                const formattedBuckets = Object.keys(tempBuckets).map(
                    (range) => ({
                        range,
                        count: tempBuckets[range],
                    })
                );

                setBuckets(formattedBuckets);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        }
        fetchData();
    }, []);

    const Barchart = ({ title, data, className }) => (
        <Paper elevation={3} className={className}>
            <Typography variant="h4" className={styles.chart_title}>
                {title}
            </Typography>
            <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#e0e0e0" />
                <Bar dataKey="count" fill="#7986CB" name="Number of Users" />
            </BarChart>
        </Paper>
    );

    return (
        <Container className={styles.dashboard_container}>
            <Barchart
                title="User Points Distribution"
                data={tempBuckets}
                className={styles.chart}
            />

            <Barchart
                title="User Time Spent Distribution"
                data={tempTimeBuckets}
                className={styles.chart}
            />
        </Container>
    );
}

export default UserStats;
