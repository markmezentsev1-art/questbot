// src/bot/commands/inventory.js
import { prisma } from "../../db/index.js";

export default async (ctx) => {
  const userId = ctx.from.id;

  const player = await prisma.player.findUnique({
    where: { telegramId: BigInt(userId) },
    include: { inventory: true },
  });

  if (!player) {
    return ctx.reply("Нет героя. /start");
  }

  if (!player.inventory || player.inventory.length === 0) {
    return ctx.reply("Твой инвентарь пуст... пора что-то найти!");
  }

  let text = "*Инвентарь:*\n\n";

  for (const item of player.inventory) {
    text += `• ${item.itemName} (${item.itemType}) × ${item.quantity}\n`;
  }

  ctx.replyWithMarkdown(text);
};
