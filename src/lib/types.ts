import type { Item, Skill } from './libraries';
import type { Trait } from './traits/traits';

export type CharacterItem = {
  item: Item;
  amount: number;
}

export type CharacterSkill = {
  skill: Skill;
  tagged: boolean;
  level: number;
  cost: number;
  specialization: string;
}

export type CharacterTrait = {
  trait: Trait;
  level: number;
  cost: number;
  requirementsMet: boolean;
}

export type ArmourValues = {
  name: string;
  physical_protection: number;
  energy_protection: number;
  sturdiness: number;
  size: number;
}

export type CharacterArmours = {
  head: ArmourValues;
  torso: ArmourValues;
  right_arm: ArmourValues;
  left_arm: ArmourValues;
  right_leg: ArmourValues;
  left_leg: ArmourValues;
}
