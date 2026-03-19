// src/bot/commands/profile.js
import { prisma } from "../../db/index.js";

export default async (ctx) => {
  const userId = ctx.from.id;

  const player = await prisma.player.findUnique({
    where: { telegramId: BigInt(userId) },
  });

  if (!player) {
    return ctx.reply("У тебя ещё нет героя! Используй /start чтобы создать.");
  }

  ctx.reply(
    `Профиль героя:\n\n` +
      `Имя: ${player.name}\n` +
      `Класс: ${player.class}\n` +
      `Уровень: ${player.level}\n` +
      `Опыт: ${player.exp} / ${player.level * 200}\n` +
      `HP: ${player.hp} / ${player.maxHp}\n` +
      `Атака: ${player.attack}\n` +
      `Защита: ${player.defense}\n` +
      `Золото: ${player.gold} 💰`,
  );
};
