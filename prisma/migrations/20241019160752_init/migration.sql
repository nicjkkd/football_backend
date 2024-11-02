/*
  Warnings:

  - A unique constraint covering the columns `[playerNumber]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Player` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `Player_playerNumber_key` ON `Player`(`playerNumber`);
