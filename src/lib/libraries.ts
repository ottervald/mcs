import purimiveria_items_json from './purimiveria_items.json';
import purimiveria_skills_json from './purimiveria_skills.json';

import purimiveria_species_json from './purimiveria_species.json';
import purimiveria_weapons_json from './purimiveria_weapons.json';
import purimiveria_armours_json from './purimiveria_armours.json';
import purimiveria_shields_json from './purimiveria_shields.json';

interface AttributeModifiers {
  dexterity: number;
  body: number;
  mind: number;
  spirit: number;
  strength: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  specialized: boolean;
  description: string;
}

export const purimiveria_skills = purimiveria_skills_json as Skill[];

export interface Specie {
  id: string;
  name: string;
  attribute_modifiers: AttributeModifiers;
  attribute_caps: AttributeModifiers
  traits: string[];
  starting_experience: number;
}

export const purimiveria_species = purimiveria_species_json as Specie[];

export interface Item {
  id: string;
  name: string;
  description: string;
  size: number;
  sturdiness: number;
  cost: number;
}

export const purimiveria_items = purimiveria_items_json as Item[];

export interface Attack {
  type: string;
  damage: number;
  damage_modifier: string;
  reach: string;
  strength_requirement: number;
  two_handed: boolean;
}

export interface Weapon extends Item {
  attacks: Attack[];
}

export const purimiveria_weapons = purimiveria_weapons_json as Item[];

export interface Armour extends Item {
  location: string;
  physical_protection: number;
  energy_protection: number;
}

export const purimiveria_armours = purimiveria_armours_json as Item[];

export interface Shield extends Item {
  defense_bonus: number;
  strength_requirement: number;
}

export const purimiveria_shields = purimiveria_shields_json as Item[];
