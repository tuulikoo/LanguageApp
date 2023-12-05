import { useEffect, useState } from "react";
import { useUser } from "./userContext";
/**
 * SessionTimer is a React component that tracks and updates the session time for an authenticated user.
 * It uses the `useUser` hook to access the current user's information and manages the session time
 * both in local session storage and in the database.
 *
 * Props:
 * @prop {React.ReactNode} children - Child components to be rendered within SessionTimer.
 *
 * State:
 * @state {number} sessionTime - The current session time in seconds.
 * @state {boolean} isUpdated - Flag to indicate if the session time has been recently updated.
 *
 * useEffect:
 * A React useEffect hook is used to initialize and manage the session timer interval and visibility change
 * event listener. The interval updates the session time every 10 seconds and the visibility change event
 * listener updates the database when the tab becomes hidden.
 *
 * Cleanup:
 * The useEffect hook also cleans up the interval and event listener when the component is unmounted or
 * when dependencies change.
 *
 * @function updateDatabase - An asynchronous function that sends the current session time to the server.
 * It updates the database with the user's session time and resets the session time in the local state
 * and session storage.
 *
 * @returns {React.ReactNode} The rendered child components.
 */
function SessionTimer({ children }) {
    const { user } = useUser();
    const [sessionTime, setSessionTime] = useState(0);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        if (user) {
            const storedTime =
                parseInt(sessionStorage.getItem("sessionTime"), 10) || 0;
            setSessionTime(storedTime);

            const interval = setInterval(() => {
                setSessionTime((prevTime) => {
                    const newTime = prevTime + 10;
                    sessionStorage.setItem("sessionTime", newTime.toString());
                    setIsUpdated(true);
                    return newTime;
                });
            }, 10000);

            const handleVisibilityChange = () => {
                if (document.hidden && user && user.id && isUpdated) {
                    updateDatabase();
                }
            };

            document.addEventListener(
                "visibilitychange",
                handleVisibilityChange
            );

            return () => {
                clearInterval(interval);
                document.removeEventListener(
                    "visibilitychange",
                    handleVisibilityChange
                );
            };
        }
    }, [user, isUpdated]);

    const updateDatabase = async () => {
        try {
            const response = await fetch("/api/usageTimer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id, time: sessionTime }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                sessionStorage.setItem("sessionTime", "0");
                setSessionTime(0);
                setIsUpdated(false);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Failed to update time:", error);
        }
    };

    return <>{children}</>;
}

export default SessionTimer;
