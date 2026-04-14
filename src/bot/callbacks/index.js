/// src/bot/callbacks/index.js
import { classCallback } from "./class.callback.js";
import { questCallback } from "./quest.callback.js";
// import { battleCallback } from "./battle.callback.js";
// import { inventoryCallback } from "./inventory.callback.js";

const callbackHandlers = [
  { prefix: "class_", handler: classCallback },
  // { prefix: "battle_", handler: battleCallback },
  // { prefix: "inventory_", handler: inventoryCallback },
  { prefix: "quest_", handler: questCallback },
  // и т.д. — добавляй по мере необходимости
];

/**
 * Основная функция-роутер для callback_query
 */
export async function handleCallbackQuery(ctx) {
  const data = ctx.callbackQuery?.data;

  if (!data) {
    await ctx.answerCbQuery("Нет данных", { show_alert: true });
    return;
  }

  // Ищем подходящий обработчик по префиксу
  for (const { prefix, handler } of callbackHandlers) {
    if (data.startsWith(prefix)) {
      try {
        await handler(ctx);
      } catch (err) {
        console.error(`Ошибка в обработчике ${prefix}:`, err);
        await ctx.answerCbQuery("Произошла ошибка", { show_alert: true });
      }
      return;
    }
  }

  // Если никто не обработал
  console.warn(`Неизвестный callback: ${data}`);
  await ctx.answerCbQuery("Неизвестное действие", { show_alert: true });
}
