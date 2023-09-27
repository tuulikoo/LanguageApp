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

