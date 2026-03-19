// src/middlewares/player.middleware.js
import { prisma } from "../db/index.js";
import { logger } from "../logger/index.js";
import {
  createPlayer,
  findByTelegramId,
} from "#repositories/player.repository";

export const playerGuard = async (ctx, next) => {
  const telegramId = ctx.from?.id;

  // Если это не сообщение от пользователя (например, callback от кнопки) — пропускаем
  if (!telegramId) return next();

  try {
    const player = await findByTelegramId(telegramId);

    if (!player) {
      const first_name = ctx.from.first_name || "Без имени";
      const data = {
        telegramId: BigInt(telegramId),
        name: first_name,
      };
      const newPlayer = await createPlayer(data);
      ctx.state.player = newPlayer;
    }
    if (player) {
      // Герой найден — сохраняем в контекст
      ctx.state.player = player;
      logger.debug(`Игрок ${telegramId} (${player.name}) загружен`);
    }

    return next(); // продолжаем выполнение команды
  } catch (err) {
    console.error("Ошибка в playerGuard", err);
    logger.error("Ошибка в playerGuard", err);
    return ctx.reply("Произошла ошибка при проверке героя 😔 Попробуй позже.");
  }
};
