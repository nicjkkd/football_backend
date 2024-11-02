/*
  Warnings:

  - You are about to drop the column `teamName` on the `Player` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Player` DROP FOREIGN KEY `Player_teamName_fkey`;

-- AlterTable
ALTER TABLE `Player` DROP COLUMN `teamName`,
    ADD COLUMN `teamId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `Player_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
