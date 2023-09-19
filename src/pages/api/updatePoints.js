import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { userId, newPoints } = req.body;

    try {
        // Fetch current points
        const currentUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!currentUser) {
            throw new Error("User not found");
        }

        // Increment points and update the user
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { userPoints: currentUser.userPoints + newPoints },
        });

        return res.status(200).json({ updatedPoints: updatedUser.userPoints });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await prisma.$disconnect();
    }
}
