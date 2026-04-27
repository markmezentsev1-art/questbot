import { prisma } from "../db/index.js";

export const getPlayerQuests = async (playerId) => {
  return prisma.quest.findMany({
    where: { playerId },
  });
};

export const assignQuestToPlayer = async (playerId, questData) => {
  return prisma.quest.create({
    data: {
      playerId,
      ...questData,
      status: "active",
    },
  });
};
export const completeQuestById = async (questId) => {
  return prisma.quest.update({
    where: { id: questId },
    data: {
      status: "completed",
    },
  });
};
