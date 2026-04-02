/// src/bot/commands/shop.js
import { getShopItems } from "#repositories/item.repository";
export default async (ctx) => {
  try {
    // Получаем все предметы из базы, сортируем по цене
    const items = await getShopItems();

    if (items.length === 0) {
      return ctx.reply("Магазин пока пуст. Скоро появятся товары!");
    }

    let message = "*🛒 Магазин странствующего торговца*\n\n";

    items.forEach((item, index) => {
      const rarityEmoji = getRarityEmoji(item.rarity);

      message += `${rarityEmoji} **${item.name}**\n`;
      message += `   💰 ${item.value} золота\n`;

      if (item.attack > 0) message += `   ⚔️ +${item.attack} атаки\n`;
      if (item.defense > 0) message += `   🛡️ +${item.defense} защиты\n`;
      if (item.hp > 0) message += `   ❤️ +${item.hp} HP\n`;

      if (item.description) {
        message += `   📝 ${item.description}\n`;
      }

      message += "\n";
    });

    message += "💡 Чтобы купить предмет, используй команду `/buy <название>`\n";
    message += "Пример: `/buy Клинок Рассвета`";

    await ctx.replyWithMarkdown(message);
  } catch (error) {
    console.error("Ошибка в магазине:", error);
    await ctx.reply(
      "❌ Произошла ошибка при загрузке магазина. Попробуй позже.",
    );
  }
};

// Вспомогательная функция для эмодзи редкости
function getRarityEmoji(rarity) {
  switch (rarity) {
    case "Legendary":
      return "🌟";
    case "Epic":
      return "💎";
    case "Rare":
      return "🔷";
    case "Uncommon":
      return "🔶";
    default:
      return "⚪";
  }
}
