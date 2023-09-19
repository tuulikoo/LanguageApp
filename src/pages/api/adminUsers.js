import { PrismaClient } from "@prisma/client";
import { verifyToken } from "@/utils/jwt";

const prisma = new PrismaClient();

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
