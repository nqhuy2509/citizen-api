-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "status" "StatusUser" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "verifiyCode" TEXT;
