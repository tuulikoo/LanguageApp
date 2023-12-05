import prisma from "../../utils/prisma";

/**
 * Handles HTTP requests for adding a new fruit item to the database.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The body of the request.
 * @param {string} req.body.imageUrl - The URL of the fruit item image.
 * @param {string} req.body.eng - The name of the fruit in English.
 * @param {string} req.body.fin - The name of the fruit in Finnish.
 * @param {object} res - The HTTP response object.
 *
 * @returns If the request method is POST, adds a new fruit item to the database and returns it.
 *          If required fields are missing, returns a 400 status code with an error message.
 *          In case of server-side error, returns a 500 status code with the error message.
 *          If the request method is not POST, returns a 405 status code indicating method not allowed.
 */

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { imageUrl, eng, fin } = req.body;

            if (!imageUrl || !eng || !fin) {
                return res.status(400).json({
                    error: "Image URL, English word, and Finnish word are required.",
                });
            }

            const existingItems = await prisma.fruitItem.findMany();
            const highestId = existingItems.reduce(
                (maxId, item) => Math.max(maxId, item.id),
                0
            );

            const newItem = await prisma.fruitItem.create({
                data: {
                    id: highestId + 1,
                    imageUrl,
                    eng,
                    fin,
                },
            });

            return res.status(200).json(newItem);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(405).end(); // Method not allowed
    }
}
