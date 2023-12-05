import prisma from "../../utils/prisma";

/**
 * API endpoint to fetch words for a specified category from the database.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.query - The query parameters attached to the request.
 * @param {string} req.query.category - The category name for which words need to be fetched.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint retrieves a list of words associated with a specific category.
 * - The category is specified as a query parameter.
 * - It first validates the presence of the category parameter.
 * - If the category is found, it fetches the corresponding words from the 'listeningData' table.
 * - Logs are used throughout the process for monitoring and debugging purposes.
 * - Appropriate responses are returned based on the existence of the category and successful retrieval of data.
 *
 * @returns
 * - Returns a 400 status code if the category is not specified in the query.
 * - Returns a 404 status code if no data is found for the specified category.
 * - Returns a 200 status code with the list of words as a JSON response if data is successfully fetched.
 * - Returns a 500 status code with an error message in case of a server error.
 */


export default async function handler(req, res) {
    const category = req.query.category;

    if (!category) {
        return res.status(400).json({ error: "Category is required." });
    }

    try {
        console.log(`Fetching words for category: ${category}`);
        const data = await prisma.listeningData.findUnique({
            where: {
                category: category,
            },
        });

        if (!data) {
            console.log(`Data not found for category: ${category}`);
            return res.status(404).json({ error: "Data not found." });
        }

        console.log(`Words fetched successfully for category: ${category}`);
        return res.status(200).json(data.words);
    } catch (error) {
        console.error(`Error while fetching words: ${error.message}`);
        return res.status(500).json({ error: error.message });
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma client when done
    }
}
