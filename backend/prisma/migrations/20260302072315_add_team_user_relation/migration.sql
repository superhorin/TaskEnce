-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "achievedAt" TIMESTAMP(3),
ADD COLUMN     "achieverId" TEXT,
ADD COLUMN     "assigneeId" TEXT;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_achieverId_fkey" FOREIGN KEY ("achieverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
