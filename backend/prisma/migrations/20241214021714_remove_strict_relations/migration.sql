-- DropForeignKey
ALTER TABLE `Option` DROP FOREIGN KEY `Option_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `Question` DROP FOREIGN KEY `Question_surveyId_fkey`;

-- DropForeignKey
ALTER TABLE `Response` DROP FOREIGN KEY `Response_surveyId_fkey`;

-- DropForeignKey
ALTER TABLE `Response` DROP FOREIGN KEY `Response_userId_fkey`;

-- AlterTable
ALTER TABLE `Option` ALTER COLUMN `isCorrect` DROP DEFAULT;
