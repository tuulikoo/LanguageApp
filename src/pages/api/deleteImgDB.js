import prisma from "../../utils/prisma";

/**
 * API endpoint to delete a fruit item from the database.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The body of the request.
 * @param {number} req.body.id - The ID of the fruit item to be deleted.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint is specifically for DELETE requests.
 * - It deletes a fruit item identified by the provided ID from the database.
 * - The ID of the item to be deleted is expected in the request body.
 * - Returns a success message upon successful deletion of the item.
 * - If the ID is not provided or if any error occurs during the deletion process, appropriate error responses are returned.
 *
 * @returns
 * - Returns a 405 status code if the request method is not DELETE.
 * - Returns a 400 status code if the item ID is not provided in the request body.
 * - Returns a 200 status code with a success message upon successful deletion of the item.
 * - Returns a 500 status code with an error message in case of server error.
 */

export default async function handler(req, res) {
    if (req.method === "DELETE") {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({
                    error: "Item id is required to delete.",
                });
            }

            await prisma.fruitItem.delete({
                where: { id },
            });

            return res
                .status(200)
                .json({ message: "Item deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        return res.status(405).end(); // Method not allowed
    }
}

