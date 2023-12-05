import prisma from '../../utils/prisma';
import { generateToken } from '@/utils/jwt';
import bcrypt from 'bcrypt';


/**
 * API endpoint to create a new user in the database.
 *
 * @param {object} req - The HTTP request object containing user details.
 * @param {string} req.body.username - The username of the new user.
 * @param {string} req.body.password - The password for the new user.
 * @param {string} req.body.email - The email address of the new user.
 * @param {string} [req.body.firstName] - The first name of the new user.
 * @param {string} [req.body.language] - The preferred language of the new user.
 * @param {number} [req.body.avatarId] - The ID of the avatar selected by the new user.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint handles user registration.
 * - It checks if the username or email provided already exists in the database.
 * - Hashes the password using bcrypt for security purposes.
 * - Creates a new user in the database with the provided details.
 * - Generates a JWT token and sets it as an httpOnly cookie.
 * - Returns a success message upon successful user creation.
 *
 * @returns
 * - Returns a 400 status code with an error message if the username or email already exists.
 * - Returns a 200 status code with a success message upon successful user creation.
 * - Returns a 500 status code with an error message in case of a server error.
 */


const usernameExists = async (username) => {
    const user = await prisma.user.findUnique({ where: { username } });
    return !!user;
};

// Function to check if email already exists
const emailExists = async (email) => {
    const user = await prisma.user.findUnique({ where: { email } });
    return !!user;
};
const CreateUser = async (req, res) => {
    const { username, password, email, firstName, language, avatarId } = req.body;

    try {
        // Check if username or email already exists
        if (await usernameExists(username)) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        if (await emailExists(email)) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password using bcrypt for security
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                email,
                firstName,
                language,
                avatarId,
            },

        });

        const payload = {
            id: newUser.id,
            username: newUser.username,
        };

        // Generate jwt token
        const token = generateToken(payload);

        // Set the jwt token as an httpOnly cookie
        res.setHeader('Set-Cookie', [
            `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}`,
            // If using HTTPS, add `Secure` to the cookie:
            // `token=${token}; HttpOnly; Path=/; Secure; Max-Age=${60 * 60 * 24 * 7}`,
        ]);

        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: "Jotain meni pieleen" });
    }
};

export default CreateUser;

