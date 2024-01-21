import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
