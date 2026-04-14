import { findItemByName } from "#repositories/item.repository";
import {
  createInventoryItem,
  findInventoryItem,
  updateInventoryItem,
} from "#repositories/inventori.repository";
import { updatePlayer } from "#repositories/player.repository";

export default async (ctx) => {
  try {
    const messageText = ctx.message.text.trim();

    // Получаем название предмета после /buy
    const itemName = messageText.split(" ").slice(1).join(" ");
    console.log("BUY ITEM NAME===", itemName);
    const item = await findItemByName(itemName);
    console.log("FIND ITEM===", item);
    console.log("find gold===", ctx.state.player.gold);
    if (!item) {
      return ctx.reply(
        "Предмет не найден!" +
          "Проверь правильность названия и попробуй снова.",
      );
    }
    if (ctx.state.player.gold < item.value) {
      return ctx.reply("Недостаточно золота!");
    }
    const carentGold = ctx.state.player.gold - item.value;
    await updatePlayer(ctx.state.player.id, { gold: carentGold });
    console.log("update gold===");
    const existingInventoryItem = await findInventoryItem(
      ctx.state.player.id,
      item.id,
    );
    console.log("FIND INVENTORY ITEM===", existingInventoryItem);
    if (existingInventoryItem) {
      // Если предмет уже есть в инвентаре, увеличиваем количество
      await updateInventoryItem(existingInventoryItem.id, {
        quantity: existingInventoryItem.quantity + 1,
      });
      return ctx.reply(
        "Предмет успешно куплен!\n\n" +
          "возращайтесь  в магазин /shop, чтобы посмотреть другие товары или продолжить приключение!",
      );
    }
    await createInventoryItem({
      playerId: ctx.state.player.id,
      itemId: item.id,
      quantity: 1,
    });

    ctx.reply(
      "Предмет успешно куплен!\n\n" +
        "возращайтесь  в магазин /shop, чтобы посмотреть другие товары или продолжить приключение!",
    );
  } catch (error) {
    console.error("Ошибка при покупке предмета:", error);
    ctx.reply("Произошла ошибка при покупке предмета. Попробуйте позже.");
  }
};
