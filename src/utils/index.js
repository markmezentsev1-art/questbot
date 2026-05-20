import { updatePlayer } from "#repositories/player.repository";
import { updateInventoryItembyitemid } from "#repositories/inventori.repository";
import { LEVELS } from "../config/constants.js";
import {
  getPlayerQuests,
  completeQuestById,
} from "#repositories/quest.repository";

export const updater = async (result, player) => {
  const playerId = player.id;
  if (result.hpChange && result.hpChange !== 0) {
    const carenthp = player.hp + result.hpChange;
    console.log("result", result);

    console.log("player", player.hp);
    await updatePlayer(playerId, { hp: carenthp });
  }

  if (result.removeItemQuantity && result.removeItemQuantity !== 0) {
    const inventoryItem = player.inventory.find(
      (i) => i.itemId === result.usedItemId,
    );

    const carentitems = inventoryItem.quantity - result.removeItemQuantity;

    await updateInventoryItembyitemid(result.usedItemId, playerId, {
      quantity: carentitems,
    });
  }

  if (result.expChange && result.expChange !== 0) {
    const carentexp = player.exp + result.expChange;
    console.log("result", result);

    console.log("player", player);
    await updatePlayer(playerId, { exp: carentexp });
  }
  console.log("player exp", player.exp);
  if (
    player.exp >= LEVELS.find((l) => l.level === player.level + 1)?.requiredExp
  ) {
    console.log(LEVELS.find((l) => l.level === player.level + 1));
    const currentLevel = player.level || 1;
    const newLevel = currentLevel + 1;
    await updatePlayer(playerId, { level: newLevel });
    console.log("result", result);
  }
  if (player.level >= 2) {
    let i = 0;
    while (i < player.level) i++;
    if (player.level === i) {
      await updatePlayer(playerId, { hp: player.hp + 100 });
    }
  }

  if (result.questStatus && result.questStatus == "completed") {
    const activeQuest = await getPlayerQuests(player.id);
    await completeQuestById(activeQuest[0].id);
    console.log("result", result);
  }
};
