-- AlterTable
ALTER TABLE "intervals" ALTER COLUMN "start" DROP NOT NULL,
ALTER COLUMN "interval_start" DROP NOT NULL,
ALTER COLUMN "interval_end" DROP NOT NULL,
ALTER COLUMN "end" DROP NOT NULL;
