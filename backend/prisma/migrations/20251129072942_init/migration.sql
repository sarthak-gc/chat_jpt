/*
  Warnings:

  - The values [IMAGEFILE] on the enum `MessageType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `fileAttached` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MessageType_new" AS ENUM ('PDFFILE', 'TEXT');
ALTER TABLE "Message" ALTER COLUMN "type" TYPE "MessageType_new" USING ("type"::text::"MessageType_new");
ALTER TYPE "MessageType" RENAME TO "MessageType_old";
ALTER TYPE "MessageType_new" RENAME TO "MessageType";
DROP TYPE "public"."MessageType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "fileAttached" BOOLEAN NOT NULL,
ADD COLUMN     "filePath" TEXT;
