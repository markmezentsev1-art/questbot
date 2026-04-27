import {
  getPlayerQuests,
  completeQuestById,
} from "#repositories/quest.repository";

export default async (ctx) => {
  try {
    const player = ctx.state.player;

    if (!player) {
      return ctx.reply("Игрок не найден.");
    }

    const activeQuest = await getPlayerQuests(player.id);
    console.log(activeQuest);
    if (!activeQuest) {
      return ctx.reply("У тебя нет активного квеста.");
    }

    await completeQuestById(activeQuest[0].id);

    await ctx.reply(
      `✅ Квест завершён!\n\n` +
        `📜 ${activeQuest.title}\n\n` +
        `Награда будет выдана позже.`,
    );
  } catch (error) {
    console.error("Ошибка при завершении квеста:", error);
    await ctx.reply("❌ Не удалось завершить квест.");
  }
};
