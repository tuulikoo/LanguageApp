import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { userId, newPoints } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { userPoints: newPoints }
        });

        if (!updatedUser) {
            throw new Error('User not found or failed to update points');
        }

        return res.status(200).json({ updatedPoints: updatedUser.userPoints });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await prisma.$disconnect();
    }
}

