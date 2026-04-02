// src/repositories/item.repository.js
import { prisma } from "../db/index.js";

/**
 * Получить все предметы для магазина
 */
export const getShopItems = async () => {
  return prisma.item.findMany({
    orderBy: [
      { rarity: "desc" }, // сначала легендарные и эпические
      { value: "asc" }, // потом по возрастанию цены
    ],
    take: 15, // ограничиваем количество
  });
};

/**
 * Получить предмет по имени (для будущей команды /buy)
 */
export const findItemByName = async (name) => {
  return prisma.item.findUnique({
    where: { name },
  });
};

/**
 * Получить предмет по ID
 */
export const findItemById = async (id) => {
  return prisma.item.findUnique({
    where: { id },
  });
};
