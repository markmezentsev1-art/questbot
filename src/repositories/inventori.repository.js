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
export const findInventoryItem = async (playerId, itemId) => {
  console.log("findInventoryItem", { playerId, itemId });
  return await prisma.inventoryItem.findFirst({
    where: { playerId, itemId },
  });
};
export const updateInventoryItem = async (id, data) => {
  return prisma.inventoryItem.update({
    where: { id },
    data,
  });
};
export const updateInventoryItembyitemid = async (itemId, playerId, data) => {
  return prisma.inventoryItem.updateMany({
    where: { itemId, playerId },
    data,
  });
};
