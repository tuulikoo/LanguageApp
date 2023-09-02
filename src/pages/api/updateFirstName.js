import prisma from '../../utils/prisma';

export default async (req, res) => {
    const { userId, newFirstName } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { firstName: newFirstName },
        });

        res.status(200).json({ message: 'First name updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
