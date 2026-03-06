/*
  Warnings:

  - The values [LOW,MEDIUM,HIGH] on the enum `Priority` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('TRIVIAL', 'SIMPLE', 'CHALLENGING', 'HARD', 'EPIC');

-- CreateEnum
CREATE TYPE "Duration" AS ENUM ('BURST', 'QUICK', 'STANDARD', 'LONG', 'MARATHON');

-- AlterEnum
BEGIN;
CREATE TYPE "Priority_new" AS ENUM ('MINOR', 'NORMAL', 'IMPORTANT', 'MAJOR', 'CRITICAL');
ALTER TABLE "public"."Task" ALTER COLUMN "priority" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "priority" TYPE "Priority_new" USING ("priority"::text::"Priority_new");
ALTER TYPE "Priority" RENAME TO "Priority_old";
ALTER TYPE "Priority_new" RENAME TO "Priority";
DROP TYPE "public"."Priority_old";
ALTER TABLE "Task" ALTER COLUMN "priority" SET DEFAULT 'NORMAL';
COMMIT;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "status",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'SIMPLE',
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "duration" "Duration" NOT NULL DEFAULT 'STANDARD',
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "priority" SET DEFAULT 'NORMAL';

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "exp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "exp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "Status";
