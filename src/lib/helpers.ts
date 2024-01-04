import type {Armour, Item, Shield, Weapon} from './libraries';
import type {CharacterArmours, CharacterItem} from './types';

export function mapArmour(items:CharacterItem[]):CharacterArmours {
  let characterArmours:CharacterArmours = {
    head: {
      name: "",
      physical_protection: 0,
      energy_protection: 0,
      sturdiness: 0,
      size: 0
    },
    torso: {
      name: "",
      physical_protection: 0,
      energy_protection: 0,
      sturdiness: 0,
      size: 0
    },
    right_arm: {
      name: "",
      physical_protection: 0,
      energy_protection: 0,
      sturdiness: 0,
      size: 0
    },
    left_arm: {
      name: "",
      physical_protection: 0,
      energy_protection: 0,
      sturdiness: 0,
      size: 0
    },
    right_leg: {
      name: "",
      physical_protection: 0,
      energy_protection: 0,
      sturdiness: 0,
      size: 0
    },
    left_leg: {
      name: "",
      physical_protection: 0,
      energy_protection: 0,
      sturdiness: 0,
      size: 0
    }
  }
  const tmp_armours:Armour[] =  items.map(item => {
    if (isArmour(item.item)) {
      return item.item;
    }
  });
  const armours:Armour[] = tmp_armours.filter(item => !!item)
  for (const armour of armours) {
    switch(armour.location) {
      case "Head":
        characterArmours.head.name = armour.name;
        characterArmours.head.physical_protection = armour.physical_protection;
        characterArmours.head.energy_protection = armour.energy_protection;
        characterArmours.head.sturdiness = armour.sturdiness;
        characterArmours.head.size = armour.size;
        break;
      case "Torso":
        characterArmours.torso.name = armour.name;
        characterArmours.torso.physical_protection = armour.physical_protection;
        characterArmours.torso.energy_protection = armour.energy_protection;
        characterArmours.torso.sturdiness = armour.sturdiness;
        characterArmours.torso.size = armour.size;
        break;
      case "Left Arm":
        characterArmours.left_arm.name = armour.name;
        characterArmours.left_arm.physical_protection = armour.physical_protection;
        characterArmours.left_arm.energy_protection = armour.energy_protection;
        characterArmours.left_arm.sturdiness = armour.sturdiness;
        characterArmours.left_arm.size = armour.size;
        break;
      case "Right Arm":
        characterArmours.right_arm.name = armour.name;
        characterArmours.right_arm.physical_protection = armour.physical_protection;
        characterArmours.right_arm.energy_protection = armour.energy_protection;
        characterArmours.right_arm.sturdiness = armour.sturdiness;
        characterArmours.right_arm.size = armour.size;
        break;
      case "Left Leg":
        characterArmours.left_leg.name = armour.name;
        characterArmours.left_leg.physical_protection = armour.physical_protection;
        characterArmours.left_leg.energy_protection = armour.energy_protection;
        characterArmours.left_leg.sturdiness = armour.sturdiness;
        characterArmours.left_leg.size = armour.size;
        break;
      case "Right Leg":
        characterArmours.right_leg.name = armour.name;
        characterArmours.right_leg.physical_protection = armour.physical_protection;
        characterArmours.right_leg.energy_protection = armour.energy_protection;
        characterArmours.right_leg.sturdiness = armour.sturdiness;
        characterArmours.right_leg.size = armour.size;
        break;
    }
  }
  return characterArmours;
}

export function isArmour(item: Item): item is Armour {
  return 'physical_protection' in item;
}

export function isWeapon(item: Item): item is Weapon {
  return 'attacks' in item;
}

export function isShield(item: Item): item is Shield {
  return 'defense_bonus' in item;
}

export function getAttributeCost(startValue:number, up:boolean): number {
  if (up) {
    if (startValue < 3) {
      return 5;
    } else if (startValue < 5) {
      return 10;
    } else if (startValue < 7) {
      return 15;
    } else if (startValue < 9) {
      return 20;
    } else {
      return 25;
    }
  } else {
    if (startValue < 4) {
      return 5;
    } else if (startValue < 6) {
      return 10;
    } else if (startValue < 8) {
      return 15;
    } else if (startValue < 10) {
      return 20;
    } else {
      return 25;
    }
  }
}
