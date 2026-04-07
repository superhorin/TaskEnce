/*
  Warnings:

  - The values [SUSPENDED] on the enum `MembershipStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `taskId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `threadId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `TeamMember` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[chatThreadId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chatThreadId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MembershipStatus_new" AS ENUM ('INVITED', 'ACTIVE', 'BLOCKED', 'DECLINED');
ALTER TABLE "public"."TeamMember" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Membership" ALTER COLUMN "status" TYPE "MembershipStatus_new" USING ("status"::text::"MembershipStatus_new");
ALTER TYPE "MembershipStatus" RENAME TO "MembershipStatus_old";
ALTER TYPE "MembershipStatus_new" RENAME TO "MembershipStatus";
DROP TYPE "public"."MembershipStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_threadId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_userId_fkey";

-- AlterTable
ALTER TABLE "ChatThread" ADD COLUMN     "teamId" TEXT;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "taskId",
DROP COLUMN "threadId",
ADD COLUMN     "chatThreadId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "chatThreadId" TEXT;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "iconUrl" TEXT;

-- DropTable
DROP TABLE "TeamMember";

-- CreateTable
CREATE TABLE "Membership" (
    "id" TEXT NOT NULL,
    "role" "TeamRole" NOT NULL DEFAULT 'MEMBER',
    "status" "MembershipStatus" NOT NULL DEFAULT 'INVITED',
    "nickname" TEXT,
    "position" TEXT,
    "isMuted" BOOLEAN NOT NULL DEFAULT false,
    "teamExp" INTEGER NOT NULL DEFAULT 0,
    "teamLevel" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "inviterId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joinedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Membership_userId_teamId_key" ON "Membership"("userId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_chatThreadId_key" ON "Task"("chatThreadId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_chatThreadId_fkey" FOREIGN KEY ("chatThreadId") REFERENCES "ChatThread"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatThread" ADD CONSTRAINT "ChatThread_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatThreadId_fkey" FOREIGN KEY ("chatThreadId") REFERENCES "ChatThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
