/*
  Warnings:

  - You are about to drop the column `age` on the `Player` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Player_playerNumber_key` ON `Player`;

-- AlterTable
ALTER TABLE `Player` DROP COLUMN `age`,
    ADD COLUMN `dateBirth` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
