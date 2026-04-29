import { updatePlayer } from "#repositories/player.repository";

import { updateInventoryItembyitemid } from "#repositories/inventori.repository";
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

  console.log("player", player.p);
  await updatePlayer(playerId, { exp: carentexp });
}
