// src/bot/commands/quest.js
import { Markup } from "telegraf";

export default (ctx) => {
  return ctx.replyWithMarkdown(
    "*Доступные квесты (пока демонстрация):*\n\n" +
      '1. "Тени в лесу"\n' +
      "   Найди и уничтожь 3 гоблинов.\n" +
      "   Награда: 80 золота + опыт\n\n" +
      '2. "Потерянный амулет"\n' +
      "   Верни амулет старейшине деревни.\n" +
      "   Награда: Редкий артефакт\n\n",

    Markup.inlineKeyboard([
      [Markup.button.callback("Тени в лесу", "quest_take_1")],
      [Markup.button.callback("Потерянный амулет", "quest_take_2")],
    ]),
  );
};
