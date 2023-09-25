/*
  Warnings:

  - Added the required column `registry_id` to the `hour_record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hour_record" ADD COLUMN     "registry_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "hour_record" ADD CONSTRAINT "hour_record_registry_id_fkey" FOREIGN KEY ("registry_id") REFERENCES "registries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
