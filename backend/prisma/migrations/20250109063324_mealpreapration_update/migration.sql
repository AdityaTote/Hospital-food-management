/*
  Warnings:

  - You are about to drop the column `preparationStatus` on the `MealPreparation` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `MealPreparation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `MealPreparation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MealPreparation" DROP COLUMN "preparationStatus",
ADD COLUMN     "adminId" TEXT NOT NULL,
ADD COLUMN     "status" "PreparationStatus" NOT NULL;

-- AddForeignKey
ALTER TABLE "MealPreparation" ADD CONSTRAINT "MealPreparation_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "HospitalFoodAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
