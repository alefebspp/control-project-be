-- DropForeignKey
ALTER TABLE "adjustments" DROP CONSTRAINT "adjustments_collaborator_id_fkey";

-- DropForeignKey
ALTER TABLE "hours" DROP CONSTRAINT "hours_collaborator_id_fkey";

-- DropForeignKey
ALTER TABLE "registries" DROP CONSTRAINT "registries_collaborator_id_fkey";

-- AddForeignKey
ALTER TABLE "hours" ADD CONSTRAINT "hours_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registries" ADD CONSTRAINT "registries_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adjustments" ADD CONSTRAINT "adjustments_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE CASCADE ON UPDATE CASCADE;
