import prisma from "../../utils/prisma";

/**
 * API endpoint to remove a specific word from a category in the database.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The body of the request containing the data to be modified.
 * @param {string} req.body.categoryToDelete - The category from which the word should be removed.
 * @param {string} req.body.wordToDelete - The word to be removed from the specified category.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint handles the deletion of a word from a specific category.
 * - It requires both the category name and the word to be provided in the request body.
 * - The function first checks if the specified category exists in the database.
 * - If the category exists, it updates the category by filtering out the specified word.
 * - The response includes the updated data without the deleted word.
 * - If the required data is not provided or the category is not found, appropriate error responses are returned.
 *
 * @returns
 * - Returns a 400 status code if either the category or word to delete is not provided.
 * - Returns a 404 status code if the specified category is not found in the database.
 * - Returns a 200 status code with the updated data upon successful deletion of the word.
 * - Returns a 500 status code with an error message in case of server error.
 */

export default async function handler(req, res) {
    const { categoryToDelete, wordToDelete } = req.body;

    if (!categoryToDelete || !wordToDelete) {
        return res
            .status(400)
            .json({ error: "CategoryToDelete and WordToDelete are required." });
    }

    try {
        const data = await prisma.listeningData.findUnique({
            where: {
                category: categoryToDelete,
            },
        });

        if (!data) {
            return res.status(404).json({ error: "Data not found." });
        }

        const updatedData = await prisma.listeningData.update({
            where: {
                category: categoryToDelete,
            },
            data: {
                words: {
                    set: data.words.filter((word) => word !== wordToDelete),
                },
            },
        });

        return res.status(200).json(updatedData);
    } catch (error) {
        console.error(
            `Error while removing word "${wordToDelete}" from category "${categoryToDelete}": ${error.message}`
        );
        return res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}
