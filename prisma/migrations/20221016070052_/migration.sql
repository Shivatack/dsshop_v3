/*
  Warnings:

  - You are about to drop the column `telephone` on the `user_addresses` table. All the data in the column will be lost.
  - You are about to drop the column `phone_indicator` on the `users` table. All the data in the column will be lost.
  - Added the required column `phone` to the `user_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_addresses" DROP COLUMN "telephone",
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "phone_indicator";
