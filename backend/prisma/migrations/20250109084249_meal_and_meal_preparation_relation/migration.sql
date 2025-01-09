/*
  Warnings:

  - A unique constraint covering the columns `[mealId]` on the table `MealPreparation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MealPreparation_mealId_key" ON "MealPreparation"("mealId");
