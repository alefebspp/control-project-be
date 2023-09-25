-- CreateTable
CREATE TABLE "hours" (
    "id" TEXT NOT NULL,
    "additional" TEXT NOT NULL DEFAULT '00:00',
    "pending" TEXT NOT NULL DEFAULT '00:00',
    "collaborator_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hours_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hours" ADD CONSTRAINT "hours_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
