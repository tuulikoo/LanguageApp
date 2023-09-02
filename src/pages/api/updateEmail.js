import prisma from '../../utils/prisma';

export default async (req, res) => {
    const { userId, newEmail } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { email: newEmail },
        });

        res.status(200).json({ message: 'Email updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
