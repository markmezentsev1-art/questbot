/// src/bot/commands/shop.js
import { getShopItems } from "#repositories/item.repository";

export default async (ctx, page = 1) => {
  try {
    const player = ctx.state.player;

    const hasActiveQuest =
      player?.quests?.some((quest) => quest.status === "active") ?? false;

    if (hasActiveQuest) {
      return ctx.reply(
        "🛑 Во время активного квеста нельзя заходить в магазин.",
      );
    }

    const result = await getShopItems(page, 15);

    if (result.items.length === 0) {
      return ctx.reply("Магазин пока пуст. Скоро появятся товары!");
    }

    let message = `*🛒 Магазин странствующего торговца*\n`;
    message += `Страница ${result.page} из ${result.totalPages}\n\n`;

    result.items.forEach((item, index) => {
      const rarityEmoji = getRarityEmoji(item.rarity);
      const itemNumber = (result.page - 1) * 15 + index + 1;

      message += `${itemNumber}. ${rarityEmoji} *${item.name}*\n`;
      message += `   💰 ${item.value} золота\n`;

      if (item.attack > 0) message += `   ⚔️ +${item.attack} атаки\n`;
      if (item.defense > 0) message += `   🛡️ +${item.defense} защиты\n`;
      if (item.hp > 0) message += `   ❤️ +${item.hp} HP\n`;
      if (item.description) message += `   📝 ${item.description}\n`;

      message += "\n";
    });

    message += "💡 Чтобы купить предмет, используй команду `/buy <название>`\n";
    message += "Пример: `/buy Клинок Рассвета`";

    const buttons = [];

    if (result.hasPrev) {
      buttons.push({
        text: "⬅️ Назад",
        callback_data: `shop_${result.page - 1}`,
      });
    }

    if (result.hasNext) {
      buttons.push({
        text: "➡️ Вперёд",
        callback_data: `shop_${result.page + 1}`,
      });
    }

    await ctx.replyWithMarkdown(message, {
      reply_markup: {
        inline_keyboard: buttons.length ? [buttons] : [],
      },
    });
  } catch (error) {
    console.error("Ошибка в магазине:", error);
    await ctx.reply(
      "❌ Произошла ошибка при загрузке магазина. Попробуй позже.",
    );
  }
};

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
