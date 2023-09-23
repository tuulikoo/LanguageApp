import jwt from "jsonwebtoken";

const KEY = process.env.JWT_SECRET;

export const generateToken = (payload) => {
    return jwt.sign(payload, KEY, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, KEY);
    } catch (error) {
        return null;
    }
};
