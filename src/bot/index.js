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

logger.info("Бот сконфигурирован");
