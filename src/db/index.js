// src/db/index.js
// src/db/index.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function initDb() {
  await prisma.$connect();
  console.log("Prisma → PostgreSQL подключён");
}

export { prisma }; // экспортируем для использования в сервисах
