// scripts/seed-items.js
import { prisma } from "../src/db/index.js";

const prefixes = [
  "Древний",
  "Священный",
  "Проклятый",
  "Кровавый",
  "Ледяной",
  "Огненный",
  "Теневой",
  "Звёздный",
  "Божественный",
  "Адский",
  "Драконий",
  "Эльфийский",
  "Гномий",
  "Титановый",
  "Призрачный",
  "Сияющий",
  "Тёмный",
  "Королевский",
  "Забытый",
  "Вечный",
  "Рассветный",
  "Сумеречный",
];

const weaponBases = [
  "Клинок",
  "Меч",
  "Топор",
  "Кинжал",
  "Посох",
  "Лук",
  "Молот",
  "Копьё",
  "Сабля",
  "Глефа",
];
const armorBases = [
  "Доспех",
  "Кираса",
  "Кольчуга",
  "Роба",
  "Плащ",
  "Латы",
  "Шлем",
  "Перчатки",
];
const shieldBases = ["Щит", "Баклер", "Павеза", "Защитник", "Страж"];
const artifactBases = [
  "Амулет",
  "Кольцо",
  "Талисман",
  "Корона",
  "Сфера",
  "Медальон",
  "Браслет",
  "Пояс",
];
const potionBases = [
  "Зелье",
  "Эликсир",
  "Настой",
  "Отвар",
  "Сущность",
  "Эссенция",
];

function getRandomRarity() {
  const rand = Math.random();
  if (rand < 0.35) return "Common";
  if (rand < 0.65) return "Uncommon";
  if (rand < 0.82) return "Rare";
  if (rand < 0.94) return "Epic";
  return "Legendary";
}

function generateItemName(type, rarity) {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  let base;

  if (type === "Weapon")
    base = weaponBases[Math.floor(Math.random() * weaponBases.length)];
  else if (type === "Armor")
    base = armorBases[Math.floor(Math.random() * armorBases.length)];
  else if (type === "Shield")
    base = shieldBases[Math.floor(Math.random() * shieldBases.length)];
  else if (type === "Artifact")
    base = artifactBases[Math.floor(Math.random() * artifactBases.length)];
  else base = potionBases[Math.floor(Math.random() * potionBases.length)];

  if (rarity === "Legendary") return `${prefix} ${base} Судьбы`;
  if (rarity === "Epic") return `${prefix} ${base} Владык`;
  if (rarity === "Rare") return `${prefix} ${base} Героев`;

  return `${prefix} ${base}`;
}

async function seedItems(count = 100) {
  try {
    console.log(`🚀 Генерация ${count} уникальных предметов...`);

    // Очищаем таблицу перед заполнением
    await prisma.item.deleteMany();

    const items = [];

    for (let i = 0; i < count; i++) {
      const rarity = getRandomRarity();
      const typeChance = Math.random();

      let type,
        attack = 0,
        defense = 0,
        hp = 0,
        effect = null,
        value,
        description;

      if (typeChance < 0.28) {
        type = "Weapon";
        attack = Math.floor(12 + Math.random() * 50);
        description = "Мощное оружие, пропитанное древней магией.";
        value = Math.floor(attack * 4 + 25);
      } else if (typeChance < 0.5) {
        type = "Armor";
        defense = Math.floor(10 + Math.random() * 45);
        description = "Крепкая броня, способная защитить владельца.";
        value = Math.floor(defense * 5 + 35);
      } else if (typeChance < 0.65) {
        type = "Shield";
        defense = Math.floor(15 + Math.random() * 38);
        description = "Надёжный щит для обороны.";
        value = Math.floor(defense * 4.5 + 30);
      } else if (typeChance < 0.85) {
        type = "Artifact";
        attack = Math.floor(Math.random() * 22);
        defense = Math.floor(Math.random() * 18);
        hp = Math.floor(Math.random() * 40);
        effect = "special";
        description = "Древний магический артефакт с мощной аурой.";
        value = Math.floor((attack + defense + hp) * 7 + 150);
      } else {
        type = "Potion";
        hp = Math.floor(30 + Math.random() * 110);
        effect = "heal";
        description = "Зелье, восстанавливающее жизненные силы.";
        value = Math.floor(hp * 1.6 + 15);
      }

      const name = generateItemName(type, rarity);

      items.push({
        name,
        type,
        description,
        rarity,
        value: Math.max(10, Math.floor(value)), // используем value
        attack,
        defense,
        hp,
        effect,
      });
    }

    const result = await prisma.item.createMany({
      data: items,
      skipDuplicates: true,
    });

    console.log(`✅ Успешно создано ${result.count} уникальных предметов!`);
  } catch (error) {
    console.error("❌ Ошибка при генерации предметов:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Запускаем создание 100 предметов
seedItems(100);
