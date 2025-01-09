/*
  Warnings:

  - You are about to drop the `FoodManager` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FoodManager" DROP CONSTRAINT "FoodManager_assignedPantryId_fkey";

-- DropTable
DROP TABLE "FoodManager";
