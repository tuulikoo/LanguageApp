import prisma from "../../utils/prisma";
import jwt from "jsonwebtoken";

/**
 * API endpoint to fetch authenticated user's details from the database.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.cookies - The cookies attached to the request.
 * @param {string} req.cookies.token - The JWT token used for authentication, stored in cookies.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint is specifically for handling GET requests to fetch user details.
 * - It uses JWT for authentication, expecting a token in the request cookies.
 * - The token is verified to authenticate the user.
 * - Once authenticated, it retrieves detailed user information from the database.
 * - The information includes id, firstName, username, email, avatarId, language, userPoints, lastLevel, timeSpent, and userRole.
 * - Returns appropriate responses based on the success or failure of authentication and data retrieval.
 * - Ensures the database connection is closed after the operation.
 *
 * @returns
 * - Returns a 405 status code for non-GET requests.
 * - Returns a 401 status code if the token is missing or invalid.
 * - Returns a 404 status code if the authenticated user is not found in the database.
 * - Returns a 200 status code with the user's details in JSON format upon successful data retrieval.
 * - Returns a 500 status code with an error message in case of a server error.
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

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                firstName: true,
                username: true,
                email: true,
                avatarId: true,
                language: true,
                userPoints: true,
                lastLevel: true,
                timeSpent: true,
                userRole: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect();
    }
}
