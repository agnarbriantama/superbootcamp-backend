import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBooks,
  getBookById,
  getBooksByCategory,
} from "../controller/BooksController.js";

const router = express.Router();

router.get("/books", getBooks);
router.get("/books/:id", getBookById);
router.post("/books", protect, createBook);
router.patch("/books/:id", protect, updateBook);
router.delete("/books/:id", protect, deleteBooks);
router.get("/categories/:id/books", getBooksByCategory);

export default router;
