import { sendMessageToAI } from "../../lib/openai.js";
import { updatePlayer } from "#repositories/player.repository";

import { updateInventoryItembyitemid } from "#repositories/inventori.repository";
import { messageGame } from "../../lib/message.game.js";
import { findManyItems } from "#repositories/item.repository";
const history = [];
/**
 * Обработчик диалога с NPC по активному квесту
 * Использует ИИ для генерации ответов в стиле RPG
 *
 */
export async function questDialog(ctx) {
  try {
    const player = ctx.state.player;

    // Проверяем, есть ли у игрока активный квест
    if (!player?.quests || player.quests.length === 0) {
      return ctx.reply("У тебя сейчас нет активного квеста.");
    }

    const quest = player.quests[0]; // берём первый (активный) квест

    const userMessage = ctx.message.text.trim();

    // Добавляем сообщение пользователя в историю
    history.push({
      role: "user",
      content: userMessage,
    });
    const itemIds = player.inventory.map((i) => i.itemId);

    // const item = await findItemById(player.inventory[0].itemId);
    const item = await findManyItems(itemIds);
    //console.log("inventory", player.inventory[0]);
    console.log("items ", itemIds);
    // Формируем системный промпт для ИИ

    const systemPrompt = messageGame(player, item, quest);

    // Отправляем запрос к ИИ

    console.log(systemPrompt);
    const aiResponse = await sendMessageToAI(systemPrompt, history);
    console.log(aiResponse);
    const result = JSON.parse(aiResponse);
    if (result.hpChange !== 0) {
      const carenthp = player.hp + result.hpChange;
      console.log(result);
      await updatePlayer(player.id, { hp: carenthp });
    }
    if (result.removeItemQuantity !== 0) {
      const inventoryItem = player.inventory.find(
        (i) => i.itemId === result.usedItemId,
      );

      const carentitems = inventoryItem.quantity - result.removeItemQuantity;

      await updateInventoryItembyitemid(result.usedItemId, player.id, {
        quantity: carentitems,
      });
    }
    // Отправляем ответ игроку
    await ctx.reply(result.narrative);

    // Сохраняем ответ ИИ в историю
    history.push({
      role: "assistant",
      content: aiResponse,
    });

    console.log("last CTX", history);
  } catch (error) {
    console.error("Ошибка в диалоге квеста:", error);
    await ctx.reply("Произошла ошибка при разговоре с NPC. Попробуй позже.");
  }
}
