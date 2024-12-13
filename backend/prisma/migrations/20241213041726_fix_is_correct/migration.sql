/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Survey` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Survey` table. All the data in the column will be lost.
  - Made the column `isCorrect` on table `Option` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Survey` DROP FOREIGN KEY `Survey_userId_fkey`;

-- DropIndex
DROP INDEX `User_phone_key` ON `User`;

-- AlterTable
ALTER TABLE `Option` MODIFY `isCorrect` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Response` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Survey` DROP COLUMN `deletedAt`,
    DROP COLUMN `isActive`,
    DROP COLUMN `userId`;
