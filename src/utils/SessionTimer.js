import { useEffect, useState } from "react";
import { useUser } from "./userContext";

function SessionTimer({ children }) {
    const { user } = useUser();
    const [sessionTime, setSessionTime] = useState(0);

    useEffect(() => {
        // Initialize sessionTime from sessionStorage on client-side
        const storedTime = Number(sessionStorage.getItem("sessionTime")) || 0;
        setSessionTime(storedTime);

        const interval = setInterval(() => {
            setSessionTime((prevTime) => {
                const newTime = prevTime + 10;
                sessionStorage.setItem("sessionTime", newTime.toString());
                return newTime;
            });
        }, 10000);

        const handleVisibilityChange = () => {
            if (document.hidden && user && user.id) {
                updateDatabase();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            clearInterval(interval);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [user]);

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
