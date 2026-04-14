import { sendMessageToAI } from "../../lib/openai.js";

/**
 * Обработчик диалога с NPC по активному квесту
 * Использует ИИ для генерации ответов в стиле RPG
 */
export async function questDialog(ctx) {
  try {
    const player = ctx.state.player;

    // Проверяем, есть ли у игрока активный квест
    if (!player?.quests || player.quests.length === 0) {
      return ctx.reply("У тебя сейчас нет активного квеста.");
    }

    const quest = player.quests[0]; // берём первый (активный) квест

    const userMessage = ctx.message.text.trim();

    // Инициализируем историю диалога, если её ещё нет
    if (!ctx.histori) {
      ctx.histori = [];
    }

    // Добавляем сообщение пользователя в историю
    ctx.histori.push({
      role: "user",
      content: userMessage,
    });

    // Формируем системный промпт для ИИ
    const systemPrompt = `
Ты — NPC в текстовой RPG игре.
Игрок выполняет квест: "${quest.title}"

Информация об игроке:
- Имя: ${player.name}
- Класс: ${player.class}
- Уровень: ${player.level}

Описание квеста: ${quest.description}

Твоя задача:
- Помогать игроку понять, что нужно делать для выполнения квеста
- Давать полезные советы и подсказки
- Не раскрывать все решение сразу
- Поддерживать атмосферу RPG
- Мотивировать и заинтересовывать игрока
`.trim();

    // Отправляем запрос к ИИ
    const aiResponse = await sendMessageToAI(systemPrompt, [
      { role: "user", content: userMessage },
    ]);

    // Отправляем ответ игроку
    await ctx.reply(aiResponse);

    // Сохраняем ответ ИИ в историю
    ctx.histori.push({
      role: "assistant",
      content: aiResponse,
    });
  } catch (error) {
    console.error("Ошибка в диалоге квеста:", error);
    await ctx.reply("Произошла ошибка при разговоре с NPC. Попробуй позже.");
  }
}
