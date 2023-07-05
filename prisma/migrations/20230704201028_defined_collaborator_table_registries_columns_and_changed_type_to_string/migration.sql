-- AlterTable
ALTER TABLE "collaborators" ADD COLUMN     "interval_end" TEXT NOT NULL DEFAULT '13:00',
ADD COLUMN     "interval_start" TEXT NOT NULL DEFAULT '12:00',
ALTER COLUMN "shift_start" SET DATA TYPE TEXT,
ALTER COLUMN "shift_end" SET DATA TYPE TEXT;
