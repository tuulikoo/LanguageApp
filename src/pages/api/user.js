import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handle(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    // Authenticate user using the JWT from the httpOnly cookie
    const token = req.cookies.token; // Get token from cookies

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    try {
        // Find the user based on the JWT's decoded data (which ideally should contain the user ID or username)
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id  // Assuming your JWT payload contains the user ID
            },
            select: {
                id: true,
                firstName: true,
                username: true,
                email: true,
                avatarId: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
}

