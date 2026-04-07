import { prisma } from "../db/index.js";
export const createInventoryItem = async (data) => {
  return prisma.inventoryItem.create({
    data,
  });
};
export const getPlayerInventory = async (playerId) => {
  return prisma.inventoryItem.findMany({
    where: {
      playerId,
    },
    include: {
      item: true,
    },
  });
};
