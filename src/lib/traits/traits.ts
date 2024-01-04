import purimiveria_mundane_positive_traits_json from './mundane_positive.json';
import purimiveria_mundane_negative_traits_json from './mundane_negative.json';
import purimiveria_expertise_traits_json from './expertise.json';
import purimiveria_magical_supernatural_positive_traits_json from './magical_supernatural_positive.json';
import purimiveria_magical_supernatural_negative_traits_json from './magical_supernatural_negative.json';
import purimiveria_allies_companions_traits_json from './allies_companions.json';
import purimiveria_starting_equipment_traits_json from './starting_equipment.json';
import purimiveria_mega_special_traits_json from './mega_special.json';

// Conjury spheres
import conjury_healing_json from './conjury_spheres/healing.json';
import conjury_body_json from './conjury_spheres/body.json';
import conjury_air_json from './conjury_spheres/air.json';
import conjury_lightning_json from './conjury_spheres/lightning.json';
import conjury_earth_json from './conjury_spheres/earth.json';
import conjury_fire_json from './conjury_spheres/fire.json';
import conjury_water_json from './conjury_spheres/water.json';
import conjury_ice_json from './conjury_spheres/ice.json';
import conjury_aquatic_json from './conjury_spheres/aquatic.json';
import conjury_plant_json from './conjury_spheres/plant.json';
import conjury_fungal_json from './conjury_spheres/fungal.json';
import conjury_animal_json from './conjury_spheres/animal.json';
import conjury_insect_json from './conjury_spheres/insect.json';
import conjury_metamagic_json from './conjury_spheres/metamagic.json';
import conjury_death_json from './conjury_spheres/death.json';
import conjury_spirit_json from './conjury_spheres/spirit.json';
import conjury_light_json from './conjury_spheres/light.json';
import conjury_darkness_json from './conjury_spheres/darkness.json';
import conjury_mind_json from './conjury_spheres/mind.json';

interface RequiredSkill {
  name: string;
  minimumValue: number;
}

interface RequiredTrait {
  name: string;
  minimumValue: number;
}

interface AttributeModifiers {
  agility: number;
  body: number;
  mind: number;
  spirit: number;
  strength: number;
}

interface Requirements {
  attributes: AttributeModifiers;
  skills: RequiredSkill[];
  traits: RequiredTrait[];
}

export interface Trait {
  id: string;
  name: string;
  category: string;
  cost: number;
  levels: boolean;
  removable: boolean;
  exponential: boolean;
  description: string;
  requirements: Requirements;
}

const mundane_positive_traits = purimiveria_mundane_positive_traits_json as Trait[];
const mundane_negative_traits = purimiveria_mundane_negative_traits_json as Trait[];
const expertise_traits = purimiveria_expertise_traits_json as Trait[];
const magical_supernatural_positive_traits = purimiveria_magical_supernatural_positive_traits_json as Trait[];
const magical_supernatural_negative_traits = purimiveria_magical_supernatural_negative_traits_json as Trait[];
const allies_companions_traits = purimiveria_allies_companions_traits_json as Trait[];
const starting_equipment_traits = purimiveria_starting_equipment_traits_json as Trait[];
const mega_special_traits = purimiveria_mega_special_traits_json as Trait[];

const conjury_healing = conjury_healing_json as Trait[];
const conjury_body = conjury_body_json as Trait[];
const conjury_air = conjury_air_json as Trait[];
const conjury_lightning = conjury_lightning_json as Trait[];
const conjury_earth = conjury_earth_json as Trait[];
const conjury_fire = conjury_fire_json as Trait[];
const conjury_water = conjury_water_json as Trait[];
const conjury_ice = conjury_ice_json as Trait[];
const conjury_aquatic = conjury_aquatic_json as Trait[];
const conjury_plant = conjury_plant_json as Trait[];
const conjury_fungal = conjury_fungal_json as Trait[];
const conjury_animal = conjury_animal_json as Trait[];
const conjury_insect = conjury_insect_json as Trait[];
const conjury_metamagic = conjury_metamagic_json as Trait[];
const conjury_death = conjury_death_json as Trait[];
const conjury_spirit = conjury_spirit_json as Trait[];
const conjury_light = conjury_light_json as Trait[];
const conjury_darkness = conjury_darkness_json as Trait[];
const conjury_mind = conjury_mind_json as Trait[];

export const purimiveria_traits = [
  ...mundane_positive_traits,
  ...expertise_traits,
  ...magical_supernatural_positive_traits,
  ...allies_companions_traits,
  ...mundane_negative_traits,
  ...magical_supernatural_negative_traits,
  ...starting_equipment_traits,
  ...mega_special_traits,
  ...conjury_healing,
  ...conjury_body,
  ...conjury_air,
  ...conjury_lightning,
  ...conjury_earth,
  ...conjury_fire,
  ...conjury_water,
  ...conjury_ice,
  ...conjury_aquatic,
  ...conjury_plant,
  ...conjury_fungal,
  ...conjury_animal,
  ...conjury_insect,
  ...conjury_metamagic,
  ...conjury_death,
  ...conjury_spirit,
  ...conjury_light,
  ...conjury_darkness,
  ...conjury_mind,
];
