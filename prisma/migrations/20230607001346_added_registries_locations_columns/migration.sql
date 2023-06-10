-- AlterTable
ALTER TABLE "registries" ADD COLUMN     "end_location" TEXT,
ADD COLUMN     "interval_end_location" TEXT,
ADD COLUMN     "interval_start_location" TEXT,
ADD COLUMN     "start_location" TEXT;
