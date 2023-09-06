import prisma from '../../utils/prisma';
import { generateToken } from '../../utils/jwt';
import bcrypt from 'bcrypt';

// Function to check if username already exists
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
    const { username, password, email, firstName, avatarId } = req.body;

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
            `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}`, // 1 week duration
            // If using HTTPS, add `Secure` to the cookie:
            // `token=${token}; HttpOnly; Path=/; Secure; Max-Age=${60 * 60 * 24 * 7}`,
        ]);

        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: "Jotain meni pieleen" });
    }
};

export default CreateUser;

