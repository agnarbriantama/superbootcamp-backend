import { PrismaClient } from "@prisma/client";
import {
  validateReleaseYear,
  determineThickness,
  filterBook,
} from "../helper/bookHelper.js";

const prisma = new PrismaClient();

export const createBook = async (req, res) => {
  const {
    title,
    description,
    image_url,
    release_year,
    price,
    total_page,
    category_id,
  } = req.body;

  if (!validateReleaseYear(release_year)) {
    return res
      .status(400)
      .json({ msg: "Patikan tahun rilis antara 1980-2021" });
  }

  try {
    const book = await prisma.books.create({
      data: {
        title,
        description,
        image_url,
        release_year,
        price,
        total_page,
        thickness: determineThickness(total_page),
        category_id,
      },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateBook = async (req, res) => {
  const {
    title,
    description,
    image_url,
    release_year,
    price,
    total_page,
    category_id,
  } = req.body;

  if (!validateReleaseYear(release_year)) {
    return res
      .status(400)
      .json({ msg: "Patikan tahun rilis antara 1980-2021" });
  }

  try {
    const book = await prisma.books.update({
      where: { id: Number(req.params.id) },
      data: {
        title,
        description,
        image_url,
        release_year,
        price,
        total_page,
        thickness: determineThickness(total_page),
        category_id,
      },
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const conditions = filterBook(req.query);
    const books = await prisma.books.findMany({
      ...conditions,
      include: {
        category: true,
      },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.books.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteBooks = async (req, res) => {
  try {
    const book = await prisma.books.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(201).json(book);
  } catch {
    res.status(400).json({ msg: error.message });
  }
};

export const getBooksByCategory = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const filterConditions = filterBook(req.query);
    filterConditions.where.categoryId = categoryId;

    // Include category data in the response
    const books = await prisma.books.findMany({
      ...filterConditions,
      include: {
        category: true,
      },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
