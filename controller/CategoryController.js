import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategory = async (req, res) => {
  try {
    const response = await prisma.categories.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCategoryByID = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await prisma.categories.findUnique({
      where: {
        id: categoryId,
      },
      // include: {
      //   books: true, // Jika Anda ingin memuat juga buku yang terkait dengan kategori ini
      // },
    });

    if (!category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan di server", error: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await prisma.categories.create({
      data: {
        name: name,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await prisma.categories.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: name,
        // UpdatedAt: new Date(),
      },
    });
    res.status(201).json(category);
  } catch {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Mulai transaksi Prisma
    await prisma.$transaction(async (tx) => {
      // Cek apakah kategori terhubung dengan buku
      const booksInCategory = await tx.books.findMany({
        where: {
          category_id: parseInt(id),
        },
      });

      if (booksInCategory.length > 0) {
        // Jika kategori terhubung dengan buku, kembalikan pesan bahwa kategori tidak dapat dihapus
        return res.status(400).json({
          msg: "Kategori terhubung dengan buku dan tidak dapat dihapus.",
        });
      }

      // Jika tidak terhubung dengan buku, lanjutkan penghapusan kategori
      const deletedCategory = await tx.categories.delete({
        where: {
          id: parseInt(id),
        },
      });

      // Kirim respons tanpa konten karena kategori telah dihapus
      res.status(204).send();
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

export const getBooksByCategoryId = async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);

    // Mencari buku yang terhubung dengan kategori berdasarkan ID kategori
    const linkedBooks = await prisma.books.findMany({
      where: {
        category_id: categoryId,
      },
    });

    res.status(200).json(linkedBooks);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};
