import prisma from "../../utils/prisma";
import { verifyToken } from "@/utils/jwt";

/**
 * API endpoint to retrieve a list of users from the database.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.cookies - The cookies attached to the request.
 * @param {string} req.cookies.token - The JWT token used for authentication, stored in cookies.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint only supports GET requests.
 * - It uses JWT for authentication, expecting a token in the request cookies.
 * - The token is verified to authenticate the user. Only users with an 'admin' role are allowed access.
 * - On successful authentication, it fetches a list of users from the database.
 * - Each user's id, firstName, username, email, avatarId, userPoints, lastLevel, and timeSpent are retrieved.
 * - On failure (unauthenticated, unauthorized, or server error), appropriate HTTP status codes and error messages are returned.
 *
 * @returns
 * - Returns a 405 status code for non-GET requests.
 * - Returns a 401 status code if the token is missing or invalid.
 * - Returns a 403 status code if the authenticated user is not an admin.
 * - Returns a 200 status code with the list of users on success.
 * - Returns a 500 status code with an error message on server error.
 */

export default async function handle(req, res) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    // Authenticate user using the JWT from the httpOnly cookie
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
        return res.status(401).json({ error: "Authentication required" });
    }

    const decoded = verifyToken(token);

    if (!decoded || (decoded.role && decoded.role !== "admin")) {
        return res.status(403).json({ error: "Access forbidden" });
    }

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                username: true,
                email: true,
                avatarId: true,
                userPoints: true,
                lastLevel: true,
                timeSpent: true,
            },
        });

        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}
