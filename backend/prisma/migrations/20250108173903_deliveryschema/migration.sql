/*
  Warnings:

  - Added the required column `pantryId` to the `DeliveryPersonnel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryPersonnel" ADD COLUMN     "pantryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "DeliveryPersonnel" ADD CONSTRAINT "DeliveryPersonnel_pantryId_fkey" FOREIGN KEY ("pantryId") REFERENCES "PantryStaff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
