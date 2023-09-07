import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from '@/utils/jwt';
import {useUser} from "@/utils/userContext";

export default async (req, res) => {
    const { userId, newPassword, newUsername, newEmail } = req.body;

    try {
        const updatedData = {};

        // Hash the new password if provided
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updatedData.password = hashedPassword;
        }

        // Update username and email if provided
        if (newUsername) {
            updatedData.username = newUsername;
        }
        if (newEmail) {
            updatedData.email = newEmail;
        }

        // Update user details
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updatedData,
        });

        // Generate a new JWT token with updated user data
        const updatedPayload = {
            id: updatedUser.id,
            username: updatedUser.username,
            // Add other user-related data if needed
        };
        const updatedToken = generateToken(updatedPayload);

        // Set the updated JWT token as an httpOnly cookie
        res.setHeader('Set-Cookie', [
            `token=${updatedToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}`, // 1 week duration
            // If using HTTPS, add `Secure` to the cookie:
            // `token=${updatedToken}; HttpOnly; Path=/; Secure; Max-Age=${60 * 60 * 24 * 7}`,
        ]);

        res.status(200).json({ message: 'User details updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
