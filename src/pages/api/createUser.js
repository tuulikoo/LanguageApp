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
    const { username, password, email, firstName, lastName, avatarId } = req.body;

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
                lastName,
                avatarId,
            },
        });

        const payload = {
            id: newUser.id,
            username: newUser.username,
        };

        // Generate jwt token
        const token = generateToken(payload);
        res.status(200).json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
};

export default CreateUser;
