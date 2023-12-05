import React, { useState, useEffect, useContext, createContext } from "react";
import { useUser } from "../utils/userContext";
import styles from "../styles/NotificationWrapper.module.scss";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BookIcon from "@mui/icons-material/Book";
import StarIcon from "@mui/icons-material/Star";
import CoffeeIcon from "@mui/icons-material/LocalCafe";
import { useTranslation } from "react-i18next";

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};
/**
 * NotificationWrapper is a component that provides notification functionality across the application.
 * It utilizes a context to allow child components to trigger notifications. Notifications include
 * customizable messages and icons that change based on the user's time spent on the application.
 * The notifications automatically hide after a certain duration.
 *
 * @component
 * @example
 * return (
 *   <NotificationWrapper>
 *     <ChildComponent />
 *   </NotificationWrapper>
 * )
 *
 * @param {Object} props - The props for the NotificationWrapper component.
 * @param {React.ReactNode} props.children - Child components that will have access to the notification context.
 *
 * @returns {React.ReactElement} A React component that renders a notification context provider and displays
 * notifications based on the provided messages and user interaction within the application.
 */

const NotificationWrapper = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const { user } = useUser();
    const [icon, setIcon] = useState();
    const { t } = useTranslation();

    useEffect(() => {
        // wait for user to be loaded
        if (!user) return;
        const timeSpent = user?.timeSpent || 0;
        const totalTime = Math.floor(timeSpent / 600);

        if (timeSpent === 0) {
            setMessage(t("startStudying"));
            setIcon(<BookIcon />);
        } else if (timeSpent > 0 && timeSpent <= 600) {
            setMessage(t("trainingMessage", { totalTime }));
            setIcon(<StarIcon />);
        } else if (timeSpent > 600 && timeSpent <= 1200) {
            setMessage(t("greatJobMessage", { totalTime }));
            setIcon(<CoffeeIcon />);
        } else {
            setMessage(t("keepGoingMessage", { totalTime }));
            setIcon(<ThumbUpIcon />);
        }

        setIsOpen(true);

        const timeoutId = setTimeout(() => {
            setIsOpen(false);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [user, t]);
    const showNotification = (msg) => {
        setMessage(msg);
        setIsOpen(true);
        setTimeout(() => {
            setIsOpen(false);
        }, 5000);
    };
    return (
        <NotificationContext.Provider value={showNotification}>
            {children}
            {isOpen && (
                <div className={`${styles.toast} ${isOpen ? styles.show : ""}`}>
                    <div className={styles.icon}>{icon}</div>
                    <button
                        className={styles.close}
                        onClick={() => setIsOpen(false)}
                    >
                        &times;
                    </button>
                    <p>{message}</p>
                </div>
            )}
        </NotificationContext.Provider>
    );
};

export default NotificationWrapper;
