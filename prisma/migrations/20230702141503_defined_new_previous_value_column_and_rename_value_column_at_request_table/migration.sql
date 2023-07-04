/*
  Warnings:

  - You are about to drop the column `value` on the `requests` table. All the data in the column will be lost.
  - Added the required column `new_value` to the `requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `previous_value` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "requests" DROP COLUMN "value",
ADD COLUMN     "new_value" TEXT NOT NULL,
ADD COLUMN     "previous_value" TEXT NOT NULL;
