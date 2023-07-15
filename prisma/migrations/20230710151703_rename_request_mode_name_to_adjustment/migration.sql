/*
  Warnings:

  - You are about to drop the `requests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_collaborator_id_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_registry_id_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_reviewer_fkey";

-- DropTable
DROP TABLE "requests";

-- CreateTable
CREATE TABLE "adjustments" (
    "id" TEXT NOT NULL,
    "registry_id" TEXT NOT NULL,
    "collaborator_id" TEXT NOT NULL,
    "status" "StatusType" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT NOT NULL,
    "registry_type" TEXT NOT NULL,
    "new_value" TEXT NOT NULL,
    "previous_value" TEXT,
    "registry_location" TEXT,
    "new_location" TEXT NOT NULL,
    "reviewer" TEXT,
    "reviewer_response" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adjustments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "adjustments" ADD CONSTRAINT "adjustments_registry_id_fkey" FOREIGN KEY ("registry_id") REFERENCES "registries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adjustments" ADD CONSTRAINT "adjustments_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adjustments" ADD CONSTRAINT "adjustments_reviewer_fkey" FOREIGN KEY ("reviewer") REFERENCES "collaborators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
