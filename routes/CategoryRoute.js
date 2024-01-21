import express from "express";
import {
  getCategory,
  getCategoryByID,
  createCategory,
  getBooksByCategoryId,
  updateCategory,
  deleteCategory,
} from "../controller/CategoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/categories", getCategory);
router.get("/categories/:id", getCategoryByID);
router.post("/categories", protect, createCategory);
router.patch("/categories/:id", protect, updateCategory);
router.delete("/categories/:id", protect, deleteCategory);
router.get("/categories/:id/books", getBooksByCategoryId);

export default router;
