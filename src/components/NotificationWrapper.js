import React, { useState, useEffect, useContext, createContext } from "react";
import { useUser } from "../utils/userContext";
import styles from "../styles/NotificationWrapper.module.scss";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import BookIcon from '@mui/icons-material/Book';
import StarIcon from '@mui/icons-material/Star';
import CoffeeIcon from '@mui/icons-material/LocalCafe';


const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

const NotificationWrapper = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const { user } = useUser();
    const [icon, setIcon] = useState();

    useEffect(() => {
        //wait for user to be loaded
        if (!user) return;
        const timeSpent = user?.timeSpent || 0;
        const totalTime = Math.floor(timeSpent / 600);

        if (timeSpent === 0) {
            setMessage("Aloita englannin kielen opsiskelu!");
            setIcon(<BookIcon />);
        } else if (timeSpent > 0 && timeSpent <= 600) {
            setMessage(`Olet treenannut ${totalTime} minuuttia! Jatka samaan malliin`);
            setIcon(<StarIcon />);
        } else if (timeSpent > 600 && timeSpent <= 1200) {
            setMessage(`Loistavaa! Olet harjoitellut jo ${totalTime} minuuttia. Jatka samaan malliin!`);
            setIcon(<CoffeeIcon />);
        } else {
            setMessage(`Oho! olet harjoitellut jo ${totalTime} minuuttia. Jatka samaan malliin!`);
            setIcon(<ThumbUpIcon />);
        }

        setIsOpen(true);


        const timeoutId = setTimeout(() => {
            setIsOpen(false);
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [user]);

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
                    <button className={styles.close} onClick={() => setIsOpen(false)}>
                        &times;
                    </button>
                    <p>{message}</p>
                </div>
            )}
        </NotificationContext.Provider>
    );
};

export default NotificationWrapper;
