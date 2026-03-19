// src/bot/index.js
import { Telegraf, Composer } from "telegraf";
import { env } from "#config/env"; // ← импортируем env, чтобы получить BOT_TOKEN
import { logger } from "../logger/index.js";
import { requestLogger } from "../middlewares/logger.middleware.js";
import { errorHandler } from "../middlewares/error.middleware.js";
import { playerGuard } from "../middlewares/player.middleware.js";
import startCommand from "../commands/start.js";
// Создаём экземпляр
export const bot = new Telegraf(env.BOT_TOKEN);

// Глобальный error handler (Telegraf catch)
bot.catch(errorHandler);

// Middleware для логирования запросов
bot.use(requestLogger);
bot.use(playerGuard);

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
