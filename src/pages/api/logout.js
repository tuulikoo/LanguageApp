/**
 * API endpoint to handle user logout requests.
 *
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 *
 * @description
 * - This endpoint is specifically for handling POST requests to log out a user.
 * - It clears the httpOnly cookie containing the user's JWT token.
 * - This effectively logs the user out by removing their session token.
 * - Appropriate responses are returned based on the success of the logout operation.
 *
 * @returns
 * - Returns a 405 status code with an error message if the request method is not POST.
 * - Returns a 200 status code with a success message upon successful logout.
 * - Returns a 500 status code with an error message in case of a server error.
 */

export default async function handle(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' }); // Only POST requests are allowed
    }

    try {
        // Clear the httpOnly cookie
        res.setHeader('Set-Cookie', [
            `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict;`, // Clear the token cookie
        ]);


        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

