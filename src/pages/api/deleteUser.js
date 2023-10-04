import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

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
