export default async (ctx) => {
  console.log("kkkk", ctx.state.player.name, ctx.state.player.inventory);
  const name = ctx.state.player.name;
  const inventory = ctx.state.player.inventory;
  if (inventory.length === 0) {
    return ctx.reply("Твой инвентарь пуст... пора что-то найти!");
  }
  // const userId = ctx.from.id;
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
  let text = "*Инвентарь:*\n\n";
  // for (const item of player.inventory) {
  //   text += `• ${item.itemName} (${item.itemType}) × ${item.quantity}\n`;
  // }
  ctx.replyWithMarkdown(text);
};
