import jwt from "jsonwebtoken";

const KEY = process.env.JWT_SECRET;

export const generateToken = (payload, key = KEY) => {
    return jwt.sign(payload, key, { expiresIn: "1h" });
};

export const verifyToken = (token, key = KEY) => {
    try {
        return jwt.verify(token, key);
    } catch (error) {
        return null;
    }
};

