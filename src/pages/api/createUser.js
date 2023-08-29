import prisma from '../../utils/prisma';
import {generateToken} from '../../utils/jwt';

export default async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {uswername},
        });
        if (user) {
            return res.status(400).json({message: 'Username already exists'});
        }
        // Hash password using bcrypt for security

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        const payload = {
            id: newUser.id,
            username: newUser.username,
        };
        // jwt token

        const token = generateToken(payload);

        res.status(200).json({message: 'User created successfully', token});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};


