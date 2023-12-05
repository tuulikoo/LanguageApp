import prisma from "../../utils/prisma";

/**
 * API endpoint to increment and update a user's points in the database.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The body of the request.
 * @param {number} req.body.userId - The ID of the user whose points are to be updated.
 * @param {number} req.body.newPoints - The number of points to be added to the user's current points.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint is specifically for handling POST requests to update a user's points.
 * - It first verifies the existence of the user in the database using the provided userId.
 * - If the user exists, it increments the user's points by the amount specified in newPoints.
 * - The updated points total is then saved in the database.
 * - The updated points total is returned as part of the response.
 * - Appropriate responses are returned based on the success or failure of the update operation.
 * - Ensures the database connection is closed after the operation.
 *
 * @returns
 * - Returns a 405 status code if the request method is not POST.
 * - Returns a 200 status code with the updated points total upon successful update.
 * - Returns a 500 status code with an error message in case of a server error or if the user is not found.
 */

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const { userId, newPoints } = req.body;

    try {
        // Fetch current points
        const currentUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!currentUser) {
            throw new Error("User not found");
        }

        // Increment points and update the user
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { userPoints: currentUser.userPoints + newPoints },
        });

        return res.status(200).json({ updatedPoints: updatedUser.userPoints });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    } finally {
        await prisma.$disconnect();
    }
}
