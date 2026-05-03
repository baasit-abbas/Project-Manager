/*
  Warnings:

  - Added the required column `priority` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "priority" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "priority" TEXT NOT NULL;
