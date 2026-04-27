import { assignQuestToPlayer } from "#repositories/quest.repository";
import quest from "../../commands/quest.js";
export const questCallback = async (ctx) => {
  const data = ctx.callbackQuery.data;
  if (data === "quest_open") {
    await quest(ctx);
  }
  console.log("questCallback", data);
  if (data === "quest_take_1") {
    //save quest (title, description, reward) to player's active quests in DB
    console.log("ctx-player", ctx.state.player);
    console.log("ctx-quest", ctx.state.player.quests);
    console.log("-----", ctx.state.player.quests.length);
    if (ctx.state.player.quests.length) {
      console.log("here");
      return ctx.reply("Квест уже выбран");
    }
    await assignQuestToPlayer(ctx.state.player.id, {
      title: "Тени в лесу",
      description: "Исследуй таинственный лес и найди источник зла.",
      reward: "gold_100 , exp_200",
    });
    await ctx.answerCbQuery();
    await ctx.editMessageText("Ты выбрал квест: Тени в лесу");
    return;
  }

  if (data === "quest_take_2") {
    //save quest (title, description, reward) to player's active quests in DB
    await assignQuestToPlayer(ctx.state.player.id, {
      title: "Потерянный амулет",
      description: "Найди древний амулет, спрятанный в заброшенной шахте.",
      reward: "gold_150 , exp_300 , item_300",
    });
    await ctx.answerCbQuery();
    await ctx.editMessageText("Ты выбрал квест: Потерянный амулет");
    return;
  }
};
