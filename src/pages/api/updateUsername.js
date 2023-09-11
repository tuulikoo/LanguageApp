import prisma from '../../utils/prisma';

export default async (req, res) => {
    const { userId, newUsername } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { username: newUsername },
        });

        res.status(200).json({ message: 'Username updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
