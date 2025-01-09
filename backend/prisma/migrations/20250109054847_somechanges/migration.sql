/*
  Warnings:

  - You are about to drop the column `adminId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Meal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mealPreparationId]` on the table `Delivery` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mealPreparationId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patientId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Delivery` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PreparationStatus" AS ENUM ('pending', 'inprogress', 'completed');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('pending', 'delivered', 'failed');

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_patientId_fkey";

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "deliveryNotes" TEXT,
ADD COLUMN     "mealPreparationId" TEXT NOT NULL,
ADD COLUMN     "patientId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "DeliveryStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "adminId",
DROP COLUMN "createdAt",
DROP COLUMN "patientId",
DROP COLUMN "time",
DROP COLUMN "updatedAt",
ADD COLUMN     "hospitalFoodAdminId" TEXT,
ADD COLUMN     "specialInstructions" TEXT;

-- DropEnum
DROP TYPE "StatusEnum";

-- CreateTable
CREATE TABLE "DietChart" (
    "id" TEXT NOT NULL,
    "mealType" "TimeEnum" NOT NULL,
    "ingredients" TEXT NOT NULL,
    "specialInstructions" TEXT,
    "patientId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "DietChart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodManager" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "assignedPantryId" TEXT NOT NULL,

    CONSTRAINT "FoodManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPreparation" (
    "id" TEXT NOT NULL,
    "preparationStatus" "PreparationStatus" NOT NULL,
    "pantryId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,

    CONSTRAINT "MealPreparation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_mealPreparationId_key" ON "Delivery"("mealPreparationId");

-- AddForeignKey
ALTER TABLE "DietChart" ADD CONSTRAINT "DietChart_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietChart" ADD CONSTRAINT "DietChart_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "HospitalFoodAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodManager" ADD CONSTRAINT "FoodManager_assignedPantryId_fkey" FOREIGN KEY ("assignedPantryId") REFERENCES "PantryStaff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPreparation" ADD CONSTRAINT "MealPreparation_pantryId_fkey" FOREIGN KEY ("pantryId") REFERENCES "PantryStaff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPreparation" ADD CONSTRAINT "MealPreparation_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_hospitalFoodAdminId_fkey" FOREIGN KEY ("hospitalFoodAdminId") REFERENCES "HospitalFoodAdmin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_mealPreparationId_fkey" FOREIGN KEY ("mealPreparationId") REFERENCES "MealPreparation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
