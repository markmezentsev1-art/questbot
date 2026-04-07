/*
  Warnings:

  - You are about to drop the column `itemName` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `itemType` on the `inventory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerId,itemId]` on the table `inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itemId` to the `inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inventory" DROP COLUMN "itemName",
DROP COLUMN "itemType",
ADD COLUMN     "itemId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "inventory_playerId_itemId_key" ON "inventory"("playerId", "itemId");

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
