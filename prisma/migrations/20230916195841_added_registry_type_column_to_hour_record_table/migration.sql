/*
  Warnings:

  - Added the required column `registry_type` to the `hour_record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hour_record" ADD COLUMN     "registry_type" TEXT NOT NULL;
