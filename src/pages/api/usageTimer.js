import prisma from "../../utils/prisma";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { userId, time } = req.body;
    if (typeof userId !== "string" || typeof time !== "number") {
        return res.status(400).json({ message: "Invalid data provided" });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { timeSpent: { increment: time } },
        });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User time updated successfully" });
    } catch (error) {
        console.error("Error while updating user time:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}
