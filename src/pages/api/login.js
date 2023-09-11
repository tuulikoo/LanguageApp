import bcrypt from "bcrypt";
import prisma from "../../utils/prisma.js"
import { generateToken } from "../../utils/jwt.js"

const loginController = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Prisma query to check if user exists
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Hashed password validation
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const payload = {
                id: user.id,
                username: user.username,
            };

            // Generate JWT token
            const token = generateToken(payload);

            // Set the JWT token as an httpOnly cookie
            res.setHeader('Set-Cookie', [
                `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}`, // 1 week duration

            ]);

            // Exclude password from the returned user data
            const { password, ...userData } = user;

            res.status(200).json({ message: "Login successful", user: userData });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    } finally {
        await prisma.$disconnect(); // Close the database connection
    }
};

export default loginController;