-- DropIndex
DROP INDEX `Option_questionId_fkey` ON `Option`;

-- DropIndex
DROP INDEX `Question_surveyId_fkey` ON `Question`;

-- DropIndex
DROP INDEX `Response_surveyId_fkey` ON `Response`;

-- DropIndex
DROP INDEX `Response_userId_fkey` ON `Response`;

-- AlterTable
ALTER TABLE `Option` MODIFY `isCorrect` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_surveyId_fkey` FOREIGN KEY (`surveyId`) REFERENCES `Survey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Option` ADD CONSTRAINT `Option_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `Question`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_surveyId_fkey` FOREIGN KEY (`surveyId`) REFERENCES `Survey`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
