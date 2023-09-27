import { useEffect, useState } from "react";
import { useUser } from "./userContext";

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

            document.addEventListener("visibilitychange", handleVisibilityChange);

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
