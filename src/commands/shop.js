// src/bot/commands/shop.js
export default (ctx) => {
  ctx.replyWithMarkdown(
    "*Магазин странствующего торговца:*\n\n" +
      "Healing Potion — 25 золота  (восстанавливает 30 HP)\n" +
      "Iron Sword      — 60 золота  (+5 атаки)\n" +
      "Leather Armor   — 45 золота  (+4 защиты)\n" +
      "Mana Crystal    — 80 золота  (+10 магии для магов)\n\n" +
      "Пока покупка не реализована. Скоро добавим!",
  );
};
