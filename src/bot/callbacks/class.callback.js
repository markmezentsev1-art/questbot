// src/bot/callbacks/class.callback.js
import { createPlayer } from "#repositories/player.repository"; // твой репозиторий

export async function classCallback(ctx) {
  const data = ctx.callbackQuery.data;
  const telegramId = ctx.from.id;

  // class_warrior → warrior
  const className = data.replace("class_", "");

  // можно добавить проверку
  const validClasses = ["warrior", "mage", "rogue"];
  if (!validClasses.includes(className)) {
    await ctx.answerCbQuery("Неверный класс", { show_alert: true });
    return;
  }

  // сохраняем выбор в сессию
  ctx.session = ctx.session || {};
  ctx.session.creatingHero = { class: className };

  await ctx.answerCbQuery();

  await ctx.editMessageText(
    `Ты выбрал **${className.charAt(0).toUpperCase() + className.slice(1)}**!\n\n` +
      `Теперь придумай имя своему герою.\nНапиши его в чат:`,
    { parse_mode: "Markdown" },
  );

  // Дальше ждём текстовое сообщение с именем
  // (об этом ниже — в bot/index.js)
}
