import prisma from "../../utils/prisma";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { userId, time } = req.body;

    if (!userId || !time || typeof time !== 'number') {
        return res.status(400).json({ message: "Invalid data provided" });
    }

    try {
        
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { timeSpent: true }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

      
        const newTimeSpent = (user.timeSpent || 0) + time;

       
        await prisma.user.update({
            where: { id: userId },
            data: { timeSpent: newTimeSpent }
        });

    } catch (error) {
        console.error("Error while updating user time:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}

