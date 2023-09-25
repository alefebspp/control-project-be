/*
  Warnings:

  - You are about to drop the `hours` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "HourRecordType" AS ENUM ('ADDITIONAL', 'PENDING');

-- DropForeignKey
ALTER TABLE "hours" DROP CONSTRAINT "hours_collaborator_id_fkey";

-- AlterTable
ALTER TABLE "collaborators" ADD COLUMN     "hours_balance" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "hours";

-- CreateTable
CREATE TABLE "hour_record" (
    "id" TEXT NOT NULL,
    "type" "HourRecordType" NOT NULL,
    "seconds" INTEGER NOT NULL,
    "collaborator_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hour_record_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hour_record" ADD CONSTRAINT "hour_record_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE CASCADE ON UPDATE CASCADE;
