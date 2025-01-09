/*
  Warnings:

  - You are about to drop the column `ingredients` on the `DietChart` table. All the data in the column will be lost.
  - You are about to drop the column `specialInstructions` on the `DietChart` table. All the data in the column will be lost.
  - Added the required column `dietId` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DietChart" DROP COLUMN "ingredients",
DROP COLUMN "specialInstructions";

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "dietId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_DietChartToMeal" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DietChartToMeal_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DietChartToMeal_B_index" ON "_DietChartToMeal"("B");

-- AddForeignKey
ALTER TABLE "_DietChartToMeal" ADD CONSTRAINT "_DietChartToMeal_A_fkey" FOREIGN KEY ("A") REFERENCES "DietChart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietChartToMeal" ADD CONSTRAINT "_DietChartToMeal_B_fkey" FOREIGN KEY ("B") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
