-- AlterTable
ALTER TABLE "requests" ADD COLUMN     "reviewer" TEXT,
ADD COLUMN     "reviewer_response" TEXT;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_reviewer_fkey" FOREIGN KEY ("reviewer") REFERENCES "collaborators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
