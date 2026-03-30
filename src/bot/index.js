// src/bot/index.js
import { Telegraf, Composer, session } from "telegraf";
import { env } from "#config/env"; // ← импортируем env, чтобы получить BOT_TOKEN
import { logger } from "../logger/index.js";
import { requestLogger } from "../middlewares/logger.middleware.js";
import { errorHandler } from "../middlewares/error.middleware.js";
import { playerGuard } from "../middlewares/player.middleware.js";
import startCommand from "../commands/start.js";
import { handleCallbackQuery } from "./callbacks/index.js"; // ← импортируем роутер для callback_query

// Создаём экземпляр
export const bot = new Telegraf(env.BOT_TOKEN);

// Глобальный error handler (Telegraf catch)
bot.catch(errorHandler);
bot.use(session());
// Middleware для логирования запросов
bot.use(requestLogger);
bot.use(playerGuard);
bot.on("callback_query", handleCallbackQuery);
// Продолжение создания героя — ждём имя
// bot.on("text", async (ctx) => {
//   if (ctx.session?.creatingHero) {
//     const name = ctx.message.text.trim();

//     if (name.length < 2 || name.length > 20) {
//       return ctx.reply(
//         "Имя должно быть от 2 до 20 символов. Попробуй ещё раз:",
//       );
//     }

//     try {
//       const player = await createPlayer({
//         telegramId: BigInt(ctx.from.id),
//         name,
//         class: ctx.session.creatingHero.class,
//         // статы по классу
//         level: 1,
//         exp: 0,
//         gold: 0,
//         hp:
//           ctx.session.creatingHero.class === "warrior"
//             ? 120
//             : ctx.session.creatingHero.class === "mage"
//               ? 80
//               : 90,
//         maxHp:
//           ctx.session.creatingHero.class === "warrior"
//             ? 120
//             : ctx.session.creatingHero.class === "mage"
//               ? 80
//               : 90,
//         attack:
//           ctx.session.creatingHero.class === "warrior"
//             ? 15
//             : ctx.session.creatingHero.class === "mage"
//               ? 20
//               : 17,
//         defense:
//           ctx.session.creatingHero.class === "warrior"
//             ? 12
//             : ctx.session.creatingHero.class === "mage"
//               ? 6
//               : 8,
//       });

//       // чистим сессию
//       delete ctx.session.creatingHero;

//       await ctx.reply(
//         `Герой **${player.name}** (${player.class}) создан! 🎉\n\n` +
//           `Уровень: ${player.level} | Золото: ${player.gold}\n` +
//           `Готов отправиться в приключения?`,
//         {
//           parse_mode: "Markdown",
//           reply_markup: {
//             inline_keyboard: [
//               [{ text: "Исследовать мир 🌍", callback_data: "explore_start" }],
//             ],
//           },
//         },
//       );
//     } catch (err) {
//       console.error("Ошибка создания героя:", err);
//       await ctx.reply("Не удалось создать героя. Попробуй позже.");
//     }
//   }
// });
// Установка меню команд (лучше делать один раз при старте, но можно здесь)
await bot.telegram
  .setMyCommands([
    { command: "start", description: "Начать игру или главное меню" },
    { command: "profile", description: "Профиль и статистика" },
    { command: "explore", description: "Исследовать мир" },
    { command: "inventory", description: "Инвентарь" },
    { command: "shop", description: "Магазин" },
    { command: "quest", description: "Квесты" },
    { command: "fight", description: "Бой / арена" },
  ])
  .catch((err) => {
    logger.warn("Не удалось установить меню команд", { error: err });
  });

const commandsComposer = new Composer();
commandsComposer.command("start", startCommand);
bot.use(commandsComposer);
// Базовые команды (потом вынесешь в handlers/)
bot.start((ctx) => {
  ctx.reply("Привет! Добро пожаловать в игру 🚀\n\nИспользуй меню или /help");
});

// bot.command('profile', ...)
// bot.command('explore', ...)
// и т.д. — сюда или в отдельные файлы

logger.info("Бот сконфигурирован");
