/*
  Warnings:

  - Added the required column `collaborator_id` to the `requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "requests" ADD COLUMN     "collaborator_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
