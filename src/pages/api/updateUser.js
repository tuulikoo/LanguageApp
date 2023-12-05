import prisma from "../../utils/prisma";
import bcrypt from "bcrypt";

/**
 * API endpoint to update a user's details in the database.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The body of the request containing the details to be updated.
 * @param {number} req.body.userId - The ID of the user to be updated.
 * @param {string} [req.body.newUsername] - The new username for the user, if updated.
 * @param {string} [req.body.newPassword] - The new password for the user, if updated.
 * @param {string} [req.body.newEmail] - The new email address for the user, if updated.
 * @param {string} [req.body.newFirstName] - The new first name of the user, if updated.
 * @param {string} [req.body.newLanguage] - The new preferred language of the user, if updated.
 * @param {number} [req.body.newAvatarId] - The new avatar ID for the user, if updated.
 * @param {number} [req.body.lastLevel] - The latest level reached by the user, if updated.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint handles the updating of user details.
 * - It first checks if the user exists in the database.
 * - If the user exists, it updates any provided fields (username, password, email, first name, language, avatar ID, last level).
 * - Passwords are hashed before updating for security.
 * - The updated user details are then saved to the database.
 * - Returns appropriate responses based on the success or failure of the update operation.
 *
 * @returns
 * - Returns a 404 status code with a message if the user is not found.
 * - Returns a 200 status code with a success message upon successful update of user details.
 * - Returns a 500 status code with an error message in case of a server error.
 */

const updateUser = async (req, res) => {
    const {
        userId,
        newUsername,
        newPassword,
        newEmail,
        newFirstName,
        newLanguage,
        newAvatarId,
        lastLevel,
    } = req.body; // Update fields

    try {
        // Check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
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

        res.status(200).json({ message: "User details updated successfully" });
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({
            message: "An error occurred while updating user details",
        });
    }
};

export default updateUser;
