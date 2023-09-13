-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('REJECTED', 'ACCEPTED', 'PENDING');

-- CreateTable
CREATE TABLE "registries" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start" TEXT,
    "start_location" TEXT,
    "interval_start" TEXT,
    "interval_start_location" TEXT,
    "interval_end" TEXT,
    "interval_end_location" TEXT,
    "end" TEXT,
    "end_location" TEXT,
    "collaborator_id" TEXT NOT NULL,
    "company_id" TEXT,

    CONSTRAINT "registries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adjustments" (
    "id" TEXT NOT NULL,
    "registry_id" TEXT NOT NULL,
    "collaborator_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "collaborators" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "shift_start" TEXT NOT NULL,
    "shift_end" TEXT NOT NULL,
    "interval_start" TEXT NOT NULL DEFAULT '12:00',
    "interval_end" TEXT NOT NULL DEFAULT '13:00',
    "company_id" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "manager" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collaborators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "logo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collaborators_email_key" ON "collaborators"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- AddForeignKey
ALTER TABLE "registries" ADD CONSTRAINT "registries_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registries" ADD CONSTRAINT "registries_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adjustments" ADD CONSTRAINT "adjustments_registry_id_fkey" FOREIGN KEY ("registry_id") REFERENCES "registries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adjustments" ADD CONSTRAINT "adjustments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adjustments" ADD CONSTRAINT "adjustments_collaborator_id_fkey" FOREIGN KEY ("collaborator_id") REFERENCES "collaborators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adjustments" ADD CONSTRAINT "adjustments_reviewer_fkey" FOREIGN KEY ("reviewer") REFERENCES "collaborators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaborators" ADD CONSTRAINT "collaborators_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
