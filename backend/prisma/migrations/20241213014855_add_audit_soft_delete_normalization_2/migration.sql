/*
  Warnings:

  - You are about to alter the column `type` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - Added the required column `updatedAt` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Option` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isCorrect` BOOLEAN NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Question` MODIFY `type` ENUM('true_false', 'single_choice', 'multiple_choice', 'open') NOT NULL;
