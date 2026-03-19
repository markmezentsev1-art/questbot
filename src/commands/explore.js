// src/bot/commands/explore.js
import { prisma } from "../../db/index.js";

const LOCATIONS = ["Лес", "Пещера", "Руины", "Деревня", "Подземелье"];

export default async (ctx) => {
  const userId = ctx.from.id;

  const player = await prisma.player.findUnique({
    where: { telegramId: BigInt(userId) },
  });

  if (!player) {
    return ctx.reply("Сначала создай героя! /start");
  }

  const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];

  // Очень простое событие (потом расширишь)
  const events = [
    `Ты вошёл в **${location}**. Всё тихо... пока что.`,
    `В ${location.toLowerCase()} ты нашёл старый сундук! +15 золота.`,
    `Из тени появляется Гоблин! Готов сражаться?`,
    `Ты встретил странствующего торговца...`,
  ];

  const event = events[Math.floor(Math.random() * events.length)];

  await ctx.reply(
    `Ты отправился исследовать мир...\n\n` +
      `Локация: **${location}**\n\n` +
      `${event}\n\n` +
      "Что дальше? /explore снова или /fight ?",
  );

  // Можно здесь обновить gold, если нашёл
  if (event.includes("сундук")) {
    await prisma.player.update({
      where: { id: player.id },
      data: { gold: { increment: 15 } },
    });
  }
};
