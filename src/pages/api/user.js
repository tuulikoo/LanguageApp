import { verifyToken } from "@/utils/jwt";

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ isLoggedIn: false });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (decoded) {
    res.json({ isLoggedIn: true, user: { username: decoded.username } });
  } else {
    res.json({ isLoggedIn: false });
  }
}
