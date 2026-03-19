// src/logger/index.js
import { env } from "../config/env.js"; // ← добавь эту строку

import pino from "pino";

const isDev = env.NODE_ENV !== "production"; // теперь env доступен

const logger = pino({
  level: isDev ? "debug" : "info",
  transport: isDev
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          ignore: "pid,hostname",
          translateTime: "SYS:dd.mm.yyyy HH:MM:ss",
        },
      }
    : undefined,
  base: {
    pid: false,
    hostname: false,
  },
  formatters: {
    level(label) {
      return { level: label.toUpperCase() };
    },
  },
});

export { logger };
