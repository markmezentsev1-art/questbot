import { getPlayerInventory } from "#repositories/inventori.repository";
export default async (ctx) => {
  console.log("kkkk", ctx.state.player.name, ctx.state.player.inventory);
  const name = ctx.state.player.name;
  const inventory = await getPlayerInventory(ctx.state.player.id);
  if (inventory.length === 0) {
    return ctx.reply("Твой инвентарь пуст... пора что-то найти!");
  }

  // const player = await prisma.player.findUnique({
  //   where: { telegramId: BigInt(userId) },
  //   include: { inventory: true },
  // });
  // if (!player) {
  //   return ctx.reply("Нет героя. /start");
  // }
  // if (!player.inventory || player.inventory.length === 0) {
  //   return ctx.reply("Твой инвентарь пуст... пора что-то найти!");
  // }
  let string = `Инвентарь ${name}:\n\n`;
  inventory.forEach((item) => {
    string += `• ${item.item.name} (${item.item.type}) × ${item.quantity}\n`;
  });
  ctx.reply(string);
  let text = "*:*\n\n";
  // for (const item of player.inventory) {
  //   text += `• ${item.itemName} (${item.itemType}) × ${item.quantity}\n`;
  // }
  ctx.replyWithMarkdown(text);
};
