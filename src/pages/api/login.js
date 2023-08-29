//server side login code

import bcrypt from "bcrypt";
import prisma from "../../utils/prisma";
import { generateToken } from "../../utils/jwt";

const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    //prisma query to check if user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    //compare password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const payload = {
        id: user.id,
        username: user.username,
      };
      // jwt token
      const token = generateToken(payload);

      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    //teapot
    res.status(418).json({ message: error.message });
  }
};
export default loginController;