-- CreateTable
CREATE TABLE "co_poisoning_cases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "poisoned_at" DATETIME NOT NULL,
    "epi" INTEGER,
    "reporting_organization" TEXT,
    "address" TEXT,
    "location_type" TEXT,
    "province_name" TEXT,
    "province_id" INTEGER,
    "soum_name" TEXT,
    "soum_id" INTEGER,
    "khoroo_soum" TEXT,
    "code" TEXT,
    "age" INTEGER,
    "gender" INTEGER,
    "hospital_arrival" INTEGER,
    "physical_condition" TEXT,
    "outcome" INTEGER,
    "hbco" REAL,
    "household" INTEGER,
    "cause" TEXT,
    "khoroo" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "co_poisoning_cases_poisoned_at_idx" ON "co_poisoning_cases"("poisoned_at");
