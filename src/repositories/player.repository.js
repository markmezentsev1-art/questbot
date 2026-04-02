import { prisma } from "../db/index.js";

export const createPlayer = async (data) => {
  return prisma.player.create({
    data,
  });
};

export const findById = async (id) => {
  return prisma.player.findUnique({
    where: { id },
  });
};
export const findByTelegramId = async (telegramId) => {
  return prisma.player.findUnique({
    where: { telegramId: BigInt(telegramId) },
    include: { inventory: true }, // если нужно сразу с инвентарём
  });
};
// data - объект с полями для обновления, например: { name: "Новое имя", class: "Воин" }
export const updatePlayer = async (id, data) => {
  return prisma.player.update({
    where: { id },
    data,
  });
};
