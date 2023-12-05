import prisma from "../../utils/prisma";
import jwt from "jsonwebtoken";

/**
 * API endpoint to delete an authenticated user's account from the database.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.cookies - The cookies attached to the request.
 * @param {string} req.cookies.token - The JWT token used for authentication, stored in cookies.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint handles DELETE requests for deleting a user's account.
 * - It uses JWT for authentication, expecting a token in the request cookies.
 * - The token is verified to authenticate the user.
 * - Once authenticated, it checks if the user exists in the database.
 * - If the user exists, their account is deleted from the database.
 * - Appropriate responses are returned based on the success or failure of these operations.
 * - In case of successful deletion, it can also handle additional cleanup like clearing sessions.
 *
 * @returns
 * - Returns a 405 status code for non-DELETE requests.
 * - Returns a 401 status code if the token is missing or invalid.
 * - Returns a 404 status code if the authenticated user is not found in the database.
 * - Returns a 200 status code with a success message upon successful deletion of the user account.
 * - Returns a 500 status code with an error message in case of a server error.
 */

export default async function handle(req, res) {
    if (req.method !== "DELETE") {
        return res.status(405).end();
    }

    // Authenticate user using the JWT from the httpOnly cookie
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
        return res.status(401).json({ error: "Authentication required" });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }

    try {
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Delete the user account
        await prisma.user.delete({
            where: {
                id: user.id,
            },
        });

        // Optionally, you can clear the user's session or perform any other necessary cleanup.

        return res
            .status(200)
            .json({ message: "User account deleted successfully" });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: "An error occurred while deleting user account" });
    } finally {
        await prisma.$disconnect();
    }
}
