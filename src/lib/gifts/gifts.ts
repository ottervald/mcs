import gift_resonances_json from './resonances.json';
import gift_conjury_json from './conjury.json';
import gift_traits_json from './traits.json';

interface RequiredTrait {
  name: string;
  minimumValue: number;
}

export interface Gift {
  id: string;
  name: string;
  category: string;
  cost: number;
  description: string;
  requiredTraits: RequiredTrait[];
}

const resonances = gift_resonances_json as Gift[];
const conjury = gift_conjury_json as Gift[];
const traits = gift_traits_json as Gift[];

export const purimiveria_gifts = [
  ...resonances,
  ...conjury,
  ...traits,
];
