// src/middlewares/error.middleware.js
import { logger } from "../logger/index.js";

export const errorHandler = (err, ctx) => {
  const userId = ctx?.from?.id || "unknown";
  const chatId = ctx?.chat?.id || "unknown";
  const updateId = ctx?.update?.update_id || "unknown";

  logger.error("Необработанная ошибка в обработчике", {
    userId,
    chatId,
    updateId,
    error: err?.message || err,
    stack: err?.stack,
    updateType: ctx?.updateType,
  });

  // Пытаемся ответить пользователю (если чат живой)
  if (ctx && ctx.reply) {
    ctx
      .reply("Произошла ошибка на сервере 😔\nПопробуй позже или напиши /start")
      .catch(() => {
        // если не удалось отправить — уже ничего не сделать
      });
  }
};
