-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('user', 'assistant', 'system');

-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_itemId_fkey";

-- DropIndex
DROP INDEX "inventory_playerId_itemId_key";

-- CreateTable
CREATE TABLE "quest_messages" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "role" "MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quest_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "quest_messages_playerId_questId_createdAt_idx" ON "quest_messages"("playerId", "questId", "createdAt");

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quest_messages" ADD CONSTRAINT "quest_messages_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quest_messages" ADD CONSTRAINT "quest_messages_questId_fkey" FOREIGN KEY ("questId") REFERENCES "quests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
