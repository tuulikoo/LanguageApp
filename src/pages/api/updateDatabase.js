import prisma from "../../utils/prisma";
/**
 * API endpoint to handle GET and POST requests for managing listening data in a database.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.query - The query parameters attached to the request.
 * @param {string} [req.query.file='listeningData.json'] - The name of the file (used as a category identifier) to perform operations on.
 * @param {object} req.body - The body of the POST request.
 * @param {string} req.body.category - The category under which the word will be added (used in POST).
 * @param {string} req.body.word - The word to be added to the specified category (used in POST).
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint supports GET and POST requests for managing listening data.
 * - GET request: Fetches data from the database based on the provided file name (used as a category identifier).
 * - POST request: Adds a new word to a specific category in the database.
 * - The fileName (or category) is expected to end with '.json'.
 * - Logs are used for debugging and monitoring purposes.
 * - Appropriate responses are returned based on the success or failure of the operations.
 *
 * @returns
 * - Returns a 400 status code for invalid file types or missing required fields in POST.
 * - Returns a 404 status code if no data is found for the specified file in GET.
 * - Returns a 200 status code with the requested data for GET, and a success message for POST.
 * - Returns a 405 status code for unsupported request methods.
 * - Returns a 500 status code with an error message in case of a server error.
 */
export default async function handler(req, res) {
    const fileName = req.query.file || "listeningData.json";

    if (!fileName.endsWith(".json")) {
        return res.status(400).json({ error: "Invalid file type." });
    }

    switch (req.method) {
        case "GET":
            try {
                console.log(`Fetching data for file: ${fileName}`);
                // Fetch data from the database based on the selected file or category
                const data = await prisma.listeningData.findUnique({
                    where: {
                        category: fileName, // Use fileName as the unique identifier
                    },
                });

                if (!data) {
                    console.log(`Data not found for file: ${fileName}`);
                    return res.status(404).json({ error: "Data not found." });
                }

                console.log(`Data fetched successfully for file: ${fileName}`);
                return res.status(200).json(data);
            } catch (error) {
                console.error(`Error while fetching data: ${error.message}`);
                return res.status(500).json({ error: error.message });
            }

        case "POST":
            const { category, word } = req.body;

            if (!category || !word) {
                console.log(`Invalid POST request: missing category or word`);
                return res
                    .status(400)
                    .json({ error: "Category and word are required." });
            }

            try {
                console.log(
                    `Adding word "${word}" to category "${category}" in file: ${fileName}`
                );
                // Create or update data in the database based on the selected file or category
                await prisma.listeningData.upsert({
                    where: {
                        category: category, // Use the category from the request body as the identifier
                    },
                    create: {
                        category: category,
                        words: [word],
                    },
                    update: {
                        words: {
                            push: word,
                        },
                    },
                });

                console.log(
                    `Word "${word}" added successfully to category "${category}" in file: ${fileName}`
                );
                return res.status(200).send("Word added successfully");
            } catch (error) {
                console.error(
                    `Error while adding word "${word}" to category "${category}": ${error.message}`
                );
                return res.status(500).json({ error: error.message });
            }

        default:
            console.log(`Invalid HTTP method: ${req.method}`);
            return res.status(405).end();
    }
}

