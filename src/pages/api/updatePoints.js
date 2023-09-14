import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { userId, additionalPoints } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            throw new Error('User not found');
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { userPoints: user.userPoints + additionalPoints } // Sum the current user points and the new points.
        });

        return res.status(200).json({ updatedTotalPoints: updatedUser.userPoints }); // Rename key to updatedTotalPoints
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}

