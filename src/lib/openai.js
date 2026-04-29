import "dotenv/config"; // вместо require('dotenv').config()
import OpenAI from "openai";
import { env } from "../config/env.js"; // ← обязательно .js в конце

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function sendMessageToAI(systemPrompt, messages) {
  try {
    const context = [{ role: "system", content: systemPrompt }, ...messages];
    console.log("context", context);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: context,
      max_tokens: 10000,
      temperature: 0.78,
      top_p: 0.92,
    });
    let responseText = completion.choices[0]?.message?.content?.trim() || "";

    if (!responseText || responseText.length < 20) {
      responseText =
        "…silence. Just the echo of the same thing. Over and over.";
    }

    return responseText;
  } catch (error) {
    console.error("OpenAI → Rust Cohle error:", error.message);

    if (error?.response?.status === 429) {
      return "…too many words have already been spoken in this circle. Wait. We’ll come back here anyway.";
    }
    if (
      error?.code === "invalid_api_key" ||
      error?.code === "authentication_error"
    ) {
      return "…keys, passwords, illusions of control. Just another layer of lies.";
    }
    if (error?.code === "insufficient_quota") {
      return "…the fuel has run out. Even the illusion of motion has exhausted itself.";
    }

    return "…something broke. Like everything else.";
  }
}
export async function fixAIResponseToJSON(badResponse) {
  const systemPrompt = `
Ты — JSON fixer.

Тебе приходит текст, который должен быть ответом RPG-бота, но он не в JSON формате.

Твоя задача:
- Преобразовать текст в валидный JSON
- Не придумывать новую информацию
- Вернуть только JSON

Формат строго:
{
  "narrative": "строка",
  "hpChange": число,
  "expChange": число,
  "usedItemId": "строка или null",
  "removeItemQuantity": число,
  "reason": "строка"
}

Правила:
- narrative = исходный текст
- hpChange = 0 если в тексте нет явного урона или лечения игрока
- expChange = 0 если опыт не был начислен
- usedItemId = null если предмет не указан
- removeItemQuantity = 0 если предмет не использован
- reason = "fixed invalid json"

Опыт:
- Если в тексте сказано, что враг побеждён, уничтожен, умер, распался или больше не может сражаться, expChange должен быть больше 0.
- Если HP врага стало 0 или меньше, expChange должен быть больше 0.
- Если игрок победил врага, expChange не может быть 0.
- Если враг ещё жив или боя не было, expChange = 0.

Верни только JSON.
Ответ должен начинаться с { и заканчиваться }.
`.trim();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: badResponse },
    ],
    max_tokens: 1000,
    temperature: 0.1,
  });

  return response.choices[0]?.message?.content?.trim() || "";
}
export { sendMessageToAI };
