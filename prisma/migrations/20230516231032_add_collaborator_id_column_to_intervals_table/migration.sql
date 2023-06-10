/*
  Warnings:

  - Added the required column `collaborator_id` to the `intervals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "intervals" ADD COLUMN     "collaborator_id" TEXT NOT NULL;
