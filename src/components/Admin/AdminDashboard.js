import React, { useState } from "react";
import UserSearch from "../UserSearch";
import Button from "@mui/material/Button";
import styles from "../../styles/AdminDashboard.module.scss";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import Statistics from "./AdminStats";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ExerciseBuilderSelector from "./ExerciseBuilders/ExerciseBuilderSelector";
/**
 * AdminDashboard is a component for the administrative section of a language learning application.
 * It includes navigation buttons for switching between different administrative views such as user management, statistics, and exercise builder.
 * The component dynamically renders the selected view, providing a centralized interface for various administrative tasks.
 *
 * @component
 * @example
 * return (
 *   <AdminDashboard />
 * )
 *
 * @returns {React.ReactElement} A React component that renders an administrative dashboard.
 * It includes buttons for navigating between user management, statistics, and exercise building functionalities,
 * with each section being rendered based on the current selected view.
 */

const AdminDashboard = () => {
    const [currentView, setCurrentView] = useState("users");

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.header}>
                <div className={styles.navigation}>
                    <Button
                        startIcon={<PeopleIcon />}
                        variant="contained"
                        color="primary"
                        className={styles.navigationButton}
                        onClick={() => setCurrentView("users")}
                    >
                        Users
                    </Button>
                    <Button
                        startIcon={<AnalyticsIcon />}
                        variant="contained"
                        color="primary"
                        className={styles.navigationButton}
                        onClick={() => setCurrentView("Statistics")}
                    >
                        Statistics
                    </Button>
                    <Button
                        startIcon={<AnalyticsIcon />}
                        variant="contained"
                        color="primary"
                        className={styles.navigationButton}
                        onClick={() => setCurrentView("ExerciseBuilder")}
                    >
                        Exercise Builder
                    </Button>
                </div>

                <div className={styles.settings}>
                    <SettingsIcon color="action" />
                </div>
            </div>

            <div className={styles.mainView}>
                {currentView === "users" && <UserSearch />}
                {currentView === "Statistics" && <Statistics />}
                {currentView === "ExerciseBuilder" && (
                    <ExerciseBuilderSelector />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
