import prisma from "../../utils/prisma";

/**
 * API endpoint to increment the time spent for a user in the database.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The body of the request containing the user's ID and the time to increment.
 * @param {string} req.body.userId - The ID of the user whose time is to be incremented.
 * @param {number} req.body.time - The amount of time (in a specified unit) to increment for the user.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint is specifically for handling POST requests to increment a user's time spent.
 * - It verifies the types of the userId (string) and time (number).
 * - If the types are valid, it increments the user's time spent by the specified amount.
 * - Returns a success message upon successful update.
 * - Handles any server errors and returns appropriate error messages.
 * - Ensures the database connection is closed after the operation.
 *
 * @returns
 * - Returns a 405 status code if the request method is not POST.
 * - Returns a 400 status code with an error message if the provided data types are invalid.
 * - Returns a 404 status code with a message if the user is not found.
 * - Returns a 200 status code with a success message upon successful update of the user's time.
 * - Returns a 500 status code with an error message in case of a server error.
 */

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { userId, time } = req.body;
    if (typeof userId !== "string" || typeof time !== "number") {
        return res.status(400).json({ message: "Invalid data provided" });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { timeSpent: { increment: time } },
        });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res
            .status(200)
            .json({ message: "User time updated successfully" });
    } catch (error) {
        console.error("Error while updating user time:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    } finally {
        await prisma.$disconnect();
    }
}
