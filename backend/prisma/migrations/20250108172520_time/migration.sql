/*
  Warnings:

  - The values [Morning,Noon,Night] on the enum `TimeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TimeEnum_new" AS ENUM ('morning', 'noon', 'night');
ALTER TABLE "Diet" ALTER COLUMN "time" TYPE "TimeEnum_new" USING ("time"::text::"TimeEnum_new");
ALTER TYPE "TimeEnum" RENAME TO "TimeEnum_old";
ALTER TYPE "TimeEnum_new" RENAME TO "TimeEnum";
DROP TYPE "TimeEnum_old";
COMMIT;
