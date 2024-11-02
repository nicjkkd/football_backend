/*
  Warnings:

  - You are about to alter the column `position` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Player` MODIFY `position` ENUM('GK', 'SW', 'LB', 'LCB', 'CB', 'RCB', 'RB', 'LWB', 'LDM', 'CDM', 'RDM', 'RWB', 'LM', 'LCM', 'CM', 'RCM', 'RM', 'LW', 'LAM', 'CAM', 'RAM', 'RW', 'LS', 'CS', 'RS') NOT NULL;
