export default async (ctx) => {
  const telegramId = ctx.from.id;
  const firstName = ctx.from.first_name || "Без имени";

  // player уже загружен middleware'ом (если существует)
  const player = ctx.state.player;

  // Сценарий 1: игрок уже создан
  if (player && player.class) {
    return ctx.reply(
      `С возвращением, ${player.name || firstName}! 🌟\n\n` +
        `Твой герой готов к приключениям:\n` +
        `• Класс: ${player.class || "не выбран"}\n` +
        `• Уровень: ${player.level || 1}\n` +
        `• Опыт: ${player.exp || 0} / ${player.level * 200 || 200}\n` +
        `• Золото: ${player.gold || 0} 💰\n\n` +
        `Что дальше?`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Посмотреть квесты", callback_data: "quest_open" }],
          ],
        },
      },
    );
  }

  // Сценарий 2: игрока ещё нет → предлагаем создать
  return ctx.reply(
    `Привет, ${firstName}! Добро пожаловать в **QuestBot**! 🌌\n\n` +
      `Выбери класс своего героя:`,
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Воин (Warrior) 🛡️", callback_data: "class_warrior" },
            { text: "Маг (Mage) ✨", callback_data: "class_mage" },
            { text: "Разбойник (Rogue) 🗡️", callback_data: "class_rogue" },
          ],
          [{ text: "Подробнее о классах ℹ️", callback_data: "class_info" }],
        ],
      },
    },
  );
};
