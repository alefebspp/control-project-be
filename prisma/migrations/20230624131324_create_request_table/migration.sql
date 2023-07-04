-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('REJECTED', 'ACCEPTED', 'PENDING');

-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "registry_id" TEXT NOT NULL,
    "status" "StatusType" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT NOT NULL,
    "registry_type" TEXT NOT NULL,
    "registry_location" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_registry_id_fkey" FOREIGN KEY ("registry_id") REFERENCES "registries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
