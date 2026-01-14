/*
  Warnings:

  - Changed the type of `category` on the `ClothingItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `season` on the `ClothingItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Top', 'Bottom', 'Shoes', 'Outerwear', 'Accessory');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('All', 'Spring', 'Summer', 'Fall', 'Winter');

-- AlterTable
ALTER TABLE "ClothingItem" DROP COLUMN "category",
ADD COLUMN     "category" "Category" NOT NULL,
DROP COLUMN "season",
ADD COLUMN     "season" "Season" NOT NULL;
