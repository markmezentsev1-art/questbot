import { findItemByName } from "#repositories/item.repository";
import { createInventoryItem } from "#repositories/inventori.repository";
import { updatePlayer } from "#repositories/player.repository";
export default async (ctx) => {
  const messageText = ctx.message.text.trim();

  // Получаем название предмета после /buy
  const itemName = messageText.split(" ").slice(1).join(" ");
  console.log("BUY ITEM NAME===", itemName);
  const item = await findItemByName(itemName);
  console.log("FIND ITEM===", item);
  console.log("find gold===", ctx.state.player.gold);
  if (!item) {
    return ctx.reply("Предмет не найден!");
  }
  if (ctx.state.player.gold < item.value) {
    return ctx.reply("Недостаточно золота!");
  }
  const carentGold = ctx.state.player.gold - item.value;
  await updatePlayer(ctx.state.player.id, { gold: carentGold });
  console.log("update gold===");
  await createInventoryItem({
    playerId: ctx.state.player.id,
    itemId: item.id,
    quantity: 1,
  });
  ctx.reply(
    "Добро пожаловать в магазин! Здесь ты можешь купить полезные предметы для своих приключений.\n\n" +
      "Пока что магазин в разработке, но скоро здесь появятся товары! Следи за обновлениями и готовься к покупкам!",
  );
};
