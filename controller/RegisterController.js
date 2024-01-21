import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
export const registerUser = async (req, res) => {
  const { username, password, nama } = req.body;

  try {
    // Cek apakah username sudah ada
    const existingUser = await prisma.users.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Membuat user baru
    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        nama,
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
