import jwt from "jsonwebtoken";

const KEY = process.env.JWT_SECRET;
/**
 * Generates a JSON Web Token (JWT) with the given payload and a secret key.
 * The token is set to expire in 1 hour.
 *
 * @param {Object} payload - The payload to encode in the JWT.
 * @param {string} [key=KEY] - The secret key used for token generation. Defaults to the environment variable JWT_SECRET.
 * @returns {string} The generated JWT.
 */
export const generateToken = (payload, key = KEY) => {
    return jwt.sign(payload, key, { expiresIn: "1h" });
};
/**
 * Verifies a JSON Web Token (JWT) and returns the decoded payload if the token is valid.
 * If the token is invalid or expired, it catches the error and returns null.
 *
 * @param {string} token - The JWT to verify.
 * @param {string} [key=KEY] - The secret key used to verify the token. Defaults to the environment variable JWT_SECRET.
 * @returns {Object|null} The decoded token payload if valid, or null if invalid.
 */
export const verifyToken = (token, key = KEY) => {
    try {
        return jwt.verify(token, key);
    } catch (error) {
        return null;
    }
};

