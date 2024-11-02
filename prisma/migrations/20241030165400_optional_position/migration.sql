-- AlterTable
ALTER TABLE `Player` MODIFY `position` ENUM('BENCH', 'GK', 'SW', 'LB', 'LCB', 'CB', 'RCB', 'RB', 'LWB', 'LDM', 'CDM', 'RDM', 'RWB', 'LM', 'LCM', 'CM', 'RCM', 'RM', 'LW', 'LAM', 'CAM', 'RAM', 'RW', 'LS', 'CS', 'RS') NULL DEFAULT 'BENCH';
