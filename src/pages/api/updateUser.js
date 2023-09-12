import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';


const updateUser = async (req, res) => {
    const { userId } = req.body; // The ID of the user you want to update
    const { newUsername, newPassword, newEmail, newFirstName, newAvatarId } = req.body; // Update fields

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

        if (newFirstName) {
            existingUser.firstName = newFirstName;
        }

        if (newAvatarId) {
            existingUser.avatarId = newAvatarId;
        }

        // Save the updated user details
        await prisma.user.update({
            where: { id: userId },
            data: {
                username: existingUser.username,
                password: existingUser.password,
                email: existingUser.email,
                firstName: existingUser.firstName,
                avatarId: existingUser.avatarId,
            },
        });

        res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ message: 'An error occurred while updating user details' });
    }
};

export default updateUser;
