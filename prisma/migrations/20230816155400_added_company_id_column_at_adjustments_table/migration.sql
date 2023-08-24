/*
  Warnings:

  - Added the required column `company_id` to the `adjustments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adjustments" ADD COLUMN     "company_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "adjustments" ADD CONSTRAINT "adjustments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
