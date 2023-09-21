import React, {useState} from "react";
import UserSearch from "../UserSearch";
import Button from "@mui/material/Button";
import {Box} from "@mui/system";
import styles from "../../styles/AdminDashboard.module.scss";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import Statistics from "./AdminStats";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ExerciseBuilderSelector from "./ExerciseBuilders/ExerciseBuilderSelector";

const AdminDashboard = () => {
    const [currentView, setCurrentView] = useState("users");

    return (
        <Box className={styles.dashboardContainer}>
            <Box className={styles.header}>
                <Box className={styles.navigation}>
                    <Button
                        startIcon={<PeopleIcon/>}
                        variant="contained"
                        color="primary"
                        className={styles.navigationButton}
                        onClick={() => setCurrentView("users")}
                    >
                        Users
                    </Button>
                    <Button
                        startIcon={<AnalyticsIcon/>}
                        variant="contained"
                        color="primary"
                        className={styles.navigationButton}
                        onClick={() => setCurrentView("Statistics")}
                    >
                        Statistics
                    </Button>
                    <Button
                        startIcon={<AnalyticsIcon/>}
                        variant="contained"
                        color="primary"
                        className={styles.navigationButton}
                        onClick={() => setCurrentView("ExerciseBuilder")}
                    >
                        Exercise Builder
                    </Button>
                </Box>

                <Box className={styles.settings}>
                    <SettingsIcon color="action"/>
                </Box>
            </Box>

            <Box className={styles.mainView}>
                {currentView === "users" && <UserSearch/>}
                {currentView === "Statistics" && <Statistics/>}
                {currentView === "ExerciseBuilder" && <ExerciseBuilderSelector/>}
            </Box>
        </Box>
    );
};

export default AdminDashboard;
