import prisma from '../../utils/prisma';


const updateUserLanguage = async (req, res) => {
    const userId = req.query.userId; // Extract user ID from the query parameter
    const newLanguage = req.query.language;

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
