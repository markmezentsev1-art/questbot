import { findById, updateById } from "../repositories/userRepository.js";
import { getLevelByExp } from "./levelService.js";

export async function addExp(userId, expToAdd) {
  const user = await findById(userId);

  if (!user) {
    throw new Error(`User not found: ${userId}`);
  }

  const currentExp = user.exp || 0;
  const currentLevel = user.level || 1;

  const newExp = currentExp + expToAdd;
  const newLevel = getLevelByExp(newExp);

  const levelUp = newLevel > currentLevel;

  await updateById(userId, {
    exp: newExp,
    level: newLevel,
  });

  return {
    oldExp: currentExp,
    newExp,
    oldLevel: currentLevel,
    newLevel,
    levelUp,
  };
}
