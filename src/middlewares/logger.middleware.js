// src/middlewares/logger.middleware.js
import { logger } from "../logger/index.js";

export const requestLogger = async (ctx, next) => {
  const start = Date.now();
  const user = ctx.from
    ? `${ctx.from.id} (@${ctx.from.username || "no-username"})`
    : "unknown";
  const chat = ctx.chat ? `${ctx.chat.id} (${ctx.chat.type})` : "unknown";

  let logData = {
    updateId: ctx.update?.update_id,
    user,
    chat,
    updateType: ctx.updateType,
  };

  if (ctx.message) {
    logData = {
      ...logData,
      messageId: ctx.message.message_id,
      text: ctx.message.text || ctx.message.caption || "[no text]",
      entities: ctx.message.entities?.length || 0,
    };
  }

  if (ctx.callbackQuery) {
    logData = {
      ...logData,
      callbackData: ctx.callbackQuery.data,
      messageId: ctx.callbackQuery.message?.message_id,
    };
  }

  logger.debug("Incoming update", logData);

  try {
    await next();
  } finally {
    const ms = Date.now() - start;
    logger.debug(`Update processed in ${ms}ms`, {
      updateId: ctx.update?.update_id,
    });
  }
};
