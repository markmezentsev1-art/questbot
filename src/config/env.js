import { z } from "zod";

const envSchema = z.object({
  BOT_TOKEN: z.string().min(4, "Bot token is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables");
  console.error(parsed.error.format());
  process.exit(1); // ⛔ stop server
}

export const env = parsed.data;
