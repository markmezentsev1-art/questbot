// src/index.js — entry point
import "dotenv/config"; // 1. сначала грузим .env

// дальше уже безопасно использовать env.BOT_TOKEN
import { bootstrap } from "./app/bootstrap.js";

bootstrap().catch((err) => {
  console.error("Критическая ошибка запуска", err);
  process.exit(1);
});
