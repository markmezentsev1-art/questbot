// src/bot/commands/help.js
export default (ctx) => {
  ctx.reply(
    "Список команд QuestBot:\n\n" +
      "/start — начать или вернуться\n" +
      "/profile — посмотреть профиль героя\n" +
      "/explore — исследовать мир\n" +
      "/inventory — открыть инвентарь\n" +
      "/shop — зайти в магазин\n" +
      "/quest — получить квест\n" +
      "/fight — начать бой\n" +
      "/help — этот список",
  );
};
