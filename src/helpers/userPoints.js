export async function getUserPoints() {
    try {
        const response = await fetch('/api/user');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.userPoints;
    } catch (error) {
        throw error;
    }
}
