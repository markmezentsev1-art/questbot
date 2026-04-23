import shopCommand from "../../commands/shop.js";

export async function shopCallback(ctx) {
  const data = ctx.callbackQuery?.data;

  if (!data) {
    await ctx.answerCbQuery("Нет данных", { show_alert: true });
    return;
  }

  const page = Number(data.replace("shop_", ""));

  if (!Number.isInteger(page) || page < 1) {
    await ctx.answerCbQuery("Неверная страница", { show_alert: true });
    return;
  }

  await ctx.answerCbQuery();
  await shopCommand(ctx, page);
}
