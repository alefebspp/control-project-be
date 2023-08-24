-- AlterTable
ALTER TABLE "registries" ADD COLUMN     "company_id" TEXT;

-- AddForeignKey
ALTER TABLE "registries" ADD CONSTRAINT "registries_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registries" ADD CONSTRAINT "registries_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
