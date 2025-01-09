/*
  Warnings:

  - Added the required column `adminId` to the `Diet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `PantryStaff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diet" ADD COLUMN     "adminId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PantryStaff" ADD COLUMN     "adminId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "adminId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "HospitalFoodAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "HospitalFoodAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantryStaff" ADD CONSTRAINT "PantryStaff_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "HospitalFoodAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
