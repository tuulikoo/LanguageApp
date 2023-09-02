import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';

export default async (req, res) => {
    const { userId, newPassword } = req.body;

    try {
        // Hash the new password for security
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        res.status(200).json({ message: 'Password updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
