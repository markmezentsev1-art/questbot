import { prisma } from "../db/index.js";

export const createMessage = async (data) => {
  return prisma.questMessage.create({
    data,
  });
};

export const findByUserId = async (userId) => {
  return prisma.questMessage.findMany({
    where: { userId },
  });
};

export const getMessages = async (playerId, questId) => {
  const messages = await prisma.questMessage.findMany({
    where: { playerId, questId },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
    select: {
      role: true,
      content: true,
    },
  });
  return messages.reverse();
};
