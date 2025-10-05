-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "isArchived" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isArchived" SET DEFAULT false;
