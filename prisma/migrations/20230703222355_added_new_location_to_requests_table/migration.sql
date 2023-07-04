/*
  Warnings:

  - Added the required column `new_location` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "requests" ADD COLUMN     "new_location" TEXT NOT NULL;
