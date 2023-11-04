import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';

const updateUser = async (req, res) => {
    const { userId, newUsername, newPassword, newEmail, newFirstName,newLanguage, newAvatarId, lastLevel } = req.body; // Update fields

    try {
        // Check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details if provided
        if (newUsername) {
            existingUser.username = newUsername;
        }

        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            existingUser.password = hashedPassword;
        }

        if (newEmail) {
            existingUser.email = newEmail;
        }

        if (newLanguage) {
            existingUser.language = newLanguage;
        }

        if (newFirstName) {
            existingUser.firstName = newFirstName;
        }

        if (newAvatarId) {
            existingUser.avatarId = newAvatarId;
        }

        // Update the lastLevel if provided
        if (lastLevel) {
            existingUser.lastLevel = lastLevel;
        }

        // Save the updated user details
        await prisma.user.update({
            where: { id: userId },
            data: {
                username: existingUser.username,
                password: existingUser.password,
                email: existingUser.email,
                firstName: existingUser.firstName,
                language: existingUser.language,
                avatarId: existingUser.avatarId,
                lastLevel: existingUser.lastLevel,
            },
        });

        res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ message: 'An error occurred while updating user details' });
    }
};

export default updateUser;
