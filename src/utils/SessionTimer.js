import { useEffect } from 'react';
import { useUser } from './userContext';

function SessionTimer({ children }) {
    const { user, sessionTime, setSessionTime } = useUser();

    useEffect(() => {
        const interval = setInterval(() => {
            setSessionTime(prevTime => prevTime + 1); // Increment timerevery second
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const updateDatabase = async () => {
            if (!user || !user.id) return;

            try {
                const response = await fetch('/api/usageTimer', {
                   method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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

        const updateInterval = setInterval(updateDatabase, 10000);

        return () => clearInterval(updateInterval);
    }, [user]);

    return <>{children}</>;
}

export default SessionTimer;


