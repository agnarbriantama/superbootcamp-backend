/*
  Warnings:

  - You are about to drop the column `categoryId` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `releaseYear` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `totalPage` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `categories` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_year` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_page` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_categoryId_fkey`;

-- AlterTable
ALTER TABLE `books` DROP COLUMN `categoryId`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `imageUrl`,
    DROP COLUMN `releaseYear`,
    DROP COLUMN `totalPage`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `category_id` INTEGER NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `image_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `release_year` INTEGER NOT NULL,
    ADD COLUMN `total_page` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `CreatedAt`,
    DROP COLUMN `UpdatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
