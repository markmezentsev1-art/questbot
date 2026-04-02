import { de } from "zod/v4/locales";
import { updatePlayer } from "../../repositories/player.repository.js";

// Этот файл — для обработки диалогов, которые не являются командами или коллбеком
// Например, после выбора класса мы ждём имя героя — это уже диалог, а не команда

export async function dialogQuery(ctx) {
  console.log("DIALOG====", ctx.session);
  if (ctx.session?.creatingHero?.step === "name") {
    const name = ctx.message.text.trim();
    ctx.session.creatingHero.name = name;
    await updatePlayer(ctx.state.player.id, {
      name,
    });
    delete ctx.session.creatingHero.step; // диалог завершён, удаляем из сессии
    await ctx.reply(
      `Отлично! Твой герой теперь ${ctx.session.creatingHero.class} по имени ${name}.\n\n` +
        `Ты готов отправиться в приключение! 🚀`,
    );
  }
}
////////////////////////////// Ниже — тестовые функции, которые ты можешь удалить
