import "dotenv/config"; // вместо require('dotenv').config()
import OpenAI from "openai";
import { env } from "../config/env.js"; // ← обязательно .js в конце

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function sendMessageToAI(systemPrompt, messages) {
  try {
    console.log("messages", messages);
    const context = [{ role: "system", content: systemPrompt }, ...messages];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: context,
      max_tokens: 550,
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

export { sendMessageToAI };
