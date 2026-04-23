// src/repositories/item.repository.js
import { prisma } from "../db/index.js";

/**
 * Получить все предметы для магазина
 */
export const getShopItems = async (page = 1, limit = 15) => {
  const safePage = Math.max(1, Number(page) || 1);
  const skip = (safePage - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.item.findMany({
      orderBy: [{ rarity: "desc" }, { value: "asc" }],
      skip,
      take: limit,
    }),
    prisma.item.count(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    items,
    page: safePage,
    totalPages,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };
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

export const findManyItems = async (itemIds) => {
  return await prisma.item.findMany({
    where: {
      id: { in: itemIds },
    },
    select: {
      id: true,
      name: true,
      type: true,
      description: true,
      attack: true,
      defense: true,
      hp: true,
      effect: true,
    },
  });
};
