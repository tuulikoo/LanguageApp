import prisma from '../../utils/prisma';

/**
 * API endpoint to update a user's preferred language in the database.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The body of the request containing the user's ID and the new language.
 * @param {number} req.body.userId - The ID of the user whose language preference is to be updated.
 * @param {string} req.body.language - The new preferred language to set for the user.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint is responsible for updating the preferred language of a specific user.
 * - It first verifies the existence of the user in the database using the provided userId.
 * - If the user exists, it updates the user's preferred language with the new value provided.
 * - Returns a success message upon successful update.
 * - Handles any server errors and returns appropriate error messages.
 *
 * @returns
 * - Returns a 404 status code with a message if the user is not found.
 * - Returns a 200 status code with a success message upon successful update of the user's language.
 * - Returns a 500 status code with an error message in case of a server error.
 */

const updateUserLanguage = async (req, res) => {
    const userId = req.body.userId;
    const newLanguage = req.body.language;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        await prisma.user.update({
            where: { id: userId },
            data: {
                language: newLanguage,
            },
        })

        res.status(200).json({ message: 'User language updated successfully' });

    } catch (error) {
        console.error('Error updating user language:', error);
        res.status(500).json({ message: 'An error occurred while updating user language' });
    }
};

export default updateUserLanguage;
