/*
  Warnings:

  - Added the required column `enrollmentId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "enrollmentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
