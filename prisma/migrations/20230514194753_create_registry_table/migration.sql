-- CreateTable
CREATE TABLE "intervals" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "interval_start" TIMESTAMP(3) NOT NULL,
    "interval_end" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "intervals_pkey" PRIMARY KEY ("id")
);
