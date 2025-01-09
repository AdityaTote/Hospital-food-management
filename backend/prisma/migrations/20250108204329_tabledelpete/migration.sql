/*
  Warnings:

  - You are about to drop the column `dietId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the `Diet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DeliveryToMeal` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[mealId]` on the table `Delivery` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[deliveryPersonnelId]` on the table `Delivery` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mealId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Diet" DROP CONSTRAINT "Diet_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Diet" DROP CONSTRAINT "Diet_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_dietId_fkey";

-- DropForeignKey
ALTER TABLE "_DeliveryToMeal" DROP CONSTRAINT "_DeliveryToMeal_A_fkey";

-- DropForeignKey
ALTER TABLE "_DeliveryToMeal" DROP CONSTRAINT "_DeliveryToMeal_B_fkey";

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "mealId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "dietId",
ADD COLUMN     "adminId" TEXT NOT NULL,
ADD COLUMN     "patientId" TEXT NOT NULL,
ADD COLUMN     "time" "TimeEnum" NOT NULL;

-- DropTable
DROP TABLE "Diet";

-- DropTable
DROP TABLE "_DeliveryToMeal";

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_mealId_key" ON "Delivery"("mealId");

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_deliveryPersonnelId_key" ON "Delivery"("deliveryPersonnelId");

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "HospitalFoodAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
