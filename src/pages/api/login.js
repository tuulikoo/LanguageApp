import bcrypt from "bcrypt";
import prisma from "../../utils/prisma.js";
import { generateToken } from "../../utils/jwt.js";
/**
 * Controller function for handling user login requests.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The body of the request.
 * @param {string} req.body.username - The username of the user trying to log in.
 * @param {string} req.body.password - The password of the user trying to log in.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This function handles the login process for users.
 * - It first checks if the user exists in the database using their username.
 * - If the user exists, it then verifies the password using bcrypt.
 * - If the password is correct, a JWT token is generated and set as an httpOnly cookie.
 * - The user data, excluding the password, is returned along with a success message.
 * - If the username or password is incorrect, an error message is returned.
 * - Handles any server errors and ensures the database connection is closed after the operation.
 *
 * @returns
 * - Returns a 200 status code with a success message and user data (excluding password) on successful login.
 * - Returns a 401 status code with an error message if the username or password is incorrect.
 * - Returns a 500 status code with a server error message in case of a server error.
 */

const loginController = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Prisma query to check if user exists
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
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
            res.setHeader("Set-Cookie", [
                `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}`, // 1 week duration
            ]);

            // Exclude password from the returned user data
            const { password, ...userData } = user;

            res.status(200).json({
                message: "Login successful",
                user: userData,
            });
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
