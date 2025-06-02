-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ELECTRONICS', 'VEHICLES', 'REAL_ESTATE', 'JOBS', 'FURNITURE', 'FASHION', 'SERVICES', 'PETS');

-- CreateTable
CREATE TABLE "ads" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "category" "Category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" VARCHAR(255) NOT NULL,
    "organization" VARCHAR(100),
    "phone" VARCHAR(15) NOT NULL,
    "pin_code" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "link" VARCHAR(255) NOT NULL,
    "platform" VARCHAR(50) NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "ads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "adId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ads_category_idx" ON "ads"("category");

-- CreateIndex
CREATE INDEX "ads_pin_code_idx" ON "ads"("pin_code");

-- CreateIndex
CREATE INDEX "ads_userId_fkey" ON "ads"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "Image_adId_idx" ON "image"("adId");

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "Image_adId_fkey" FOREIGN KEY ("adId") REFERENCES "ads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
