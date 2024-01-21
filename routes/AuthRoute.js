import express from "express";
import { loginUser } from "../controller/LoginController.js";
import { registerUser } from "../controller/RegisterController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
