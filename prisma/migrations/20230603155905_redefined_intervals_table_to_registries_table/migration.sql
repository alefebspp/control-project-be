/*
  Warnings:

  - You are about to drop the `intervals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "intervals";

-- CreateTable
CREATE TABLE "registries" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start" TEXT,
    "interval_start" TEXT,
    "interval_end" TEXT,
    "end" TEXT,
    "collaborator_id" TEXT NOT NULL,

    CONSTRAINT "registries_pkey" PRIMARY KEY ("id")
);
