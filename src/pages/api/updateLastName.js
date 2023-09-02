import prisma from '../../utils/prisma';

export default async (req, res) => {
    const { userId, newLastName } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { lastName: newLastName },
        });

        res.status(200).json({ message: 'Last name updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
