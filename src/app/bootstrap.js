// src/app/bootstrap.js
// src/app/bootstrap.js
// src/app/bootstrap.js
import { logger } from "../logger/index.js";
import { bot } from "../bot/index.js";
import { initDb } from "../db/index.js";
import { env } from "../config/env.js"; // ← добавь здесь или выше

export async function bootstrap() {
  logger.info("🚀 Старт приложения");

  // BOT_TOKEN уже проверен в env.js → здесь можно не проверять
  // но если хочешь дополнительный лог:
  logger.debug("BOT_TOKEN загружен (длина: " + env.BOT_TOKEN.length + ")");

  await initDb();
  logger.info("База данных готова");

  await bot.launch();
  logger.info("Бот запущен (polling)");

  // graceful shutdown
  const shutdown = async (signal) => {
    logger.info(`Получен ${signal} → shutdown`);
    await bot.stop("Graceful shutdown");
    logger.info("Polling остановлен");
    process.exit(0);
  };

  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));
}
