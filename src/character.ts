import { derived, get, writable } from "svelte/store";
import type { Writable } from "svelte/store";
import { purimiveria_species } from './lib/libraries';
import type {Armour, Item, Shield, Skill, Specie, Weapon} from './lib/libraries';
import { purimiveria_traits } from './lib/traits/traits';
import type { Trait } from './lib/traits/traits';
import { mapArmour, getAttributeCost, isShield, isWeapon } from './lib/helpers';
import type { CharacterItem, CharacterSkill, CharacterTrait } from './lib/types';

const startAttributePoints:number = 15;
const startSkillExperience:number = 20;

class CharacterStore {
  player: Writable<string>;
  name: Writable<string>;
  title: Writable<string>;
  specie: Writable<Specie>;
  agility: Writable<number>;
  body: Writable<number>;
  mind: Writable<number>;
  spirit: Writable<number>;
  strength: Writable<number>;
  nativeLanguage: Writable<string>;
  characterItems: Writable<CharacterItem[]>;
  characterSkills: Writable<CharacterSkill[]>;
  characterTraits: Writable<CharacterTrait[]>;
  // Internal counters
  attributePoints: Writable<number>;
  agilityExp: Writable<number>;
  bodyExp: Writable<number>;
  mindExp: Writable<number>;
  spiritExp: Writable<number>;
  strengthExp: Writable<number>;
  itemCostTotal: Writable<number>;
  itemSizeTotal: Writable<number>;
  skillExperience: Writable<number>;
  traitExperience: Writable<number>;
  
  constructor() {
    this.player = writable('');
    this.name = writable('');
    this.title = writable('');
    this.specie = writable(purimiveria_species[0]);
    this.agility = writable(0);
    this.body = writable(0);
    this.mind = writable(0);
    this.spirit = writable(0);
    this.strength = writable(0);
    this.nativeLanguage = writable('');
    this.characterItems = writable([]);
    this.characterSkills = writable([]);
    this.characterTraits = writable([]);
    // Internal counters
    this.attributePoints = writable(startAttributePoints);
    this.agilityExp = writable(0);
    this.bodyExp = writable(0);
    this.mindExp = writable(0);
    this.spiritExp = writable(0);
    this.strengthExp = writable(0);
    this.itemCostTotal = writable(0);
    this.itemSizeTotal = writable(0);
    this.skillExperience = writable(startSkillExperience);
    this.traitExperience = writable(0);
    // Subscriptions
    this.agility.subscribe((value:number) => {
      this.updateTraits();
    });
    this.body.subscribe((value:number) => {
      this.updateTraits();
    });
    this.mind.subscribe((value:number) => {
      this.updateTraits();
    });
    this.spirit.subscribe((value:number) => {
      this.updateTraits();
    });
    this.strength.subscribe((value:number) => {
      this.updateTraits();
    });
    this.characterSkills.subscribe((value:CharacterSkill[]) => {
      this.updateTraits();
    });
    this.characterTraits.subscribe((value:CharacterTrait[]) => {
      this.updateTraits();
    });
  }

  // Derived stats
  get initiative() {
    return derived(
      [this.body, this.agility, this.specie],
      ([$body, $agility, $specie]) => {
        const tbody:number = $body + $specie.attribute_modifiers.body;
        const tagility:number = $agility + $specie.attribute_modifiers.agility;
        return tbody + tagility + 2;
      }
    )
  }
  get physicalSoak() {
    return derived(
      [this.body, this.specie],
      ([$body, $specie]) => {
        const tbody:number = 1 + Math.floor(($body + $specie.attribute_modifiers.body) / 2);
        return tbody;
      }
    )
  }
  get energySoak() {
    return derived(
      [this.body],
      ([$body]) => {
        return 0;
      }
    )
  }
  get passiveMeleeDefense() {
    return derived(
      [this.body, this.specie, this.characterSkills],
      ([$body, $specie, $skills]) => {
        const dodge:number = $skills.find(s => s.skill.name === 'Dodge' )?.level | 0;
        const tbody:number = $body + $specie.attribute_modifiers.body + dodge;
        return tbody + 3;
      }
    )
  }
  get passiveRangedDefense() {
    return derived(
      [this.agility, this.specie, this.characterSkills],
      ([$agility, $specie, $skills]) => {
        const alertness:number = $skills.find(s => s.skill.name === 'Alertness' )?.level | 0;
        const tagility:number = $agility + $specie.attribute_modifiers.agility + alertness;
        return tagility + 3;
      }
    )
  }
  get manaMax() {
    return derived(
      [this.spirit, this.mind, this.specie, this.characterTraits],
      ([$spirit, $mind, $specie, $traits]) => {
        const power:number = $traits.find(t => t.trait.name === 'Power' )?.level | 0;
        let manawell:boolean = false;
        if ($traits.find(t => t.trait.name === 'Manawell')) manawell = true;
        const tspirit:number = $spirit + $specie.attribute_modifiers.spirit;
        const tmind:number = $mind + $specie.attribute_modifiers.mind;
        let mananumber = 10 + tspirit + tmind + power;
        if (manawell) mananumber = mananumber * 2;
        if ($traits.find(t => t.trait.name === 'Hollow')) return 0;
        return mananumber;
      }
    )
  }
  get manaBaseRecovery() {
    return derived(
      [this.spirit, this.mind, this.specie, this.characterTraits],
      ([$spirit, $mind, $specie, $traits]) => {
        const power:number = $traits.find(t => t.trait.name === 'Power' )?.level | 0;
        let manawell:boolean = false;
        if ($traits.find(t => t.trait.name === 'Manawell')) manawell = true;
        const tspirit:number = $spirit + $specie.attribute_modifiers.spirit;
        const tmind:number = $mind + $specie.attribute_modifiers.mind;
        let recovery:number = Math.min(tspirit, tmind) + power;
        if (manawell) recovery = recovery * 2;
        if ($traits.find(t => t.trait.name === 'Hollow')) return 0;
        return recovery;
      }
    )
  }
  get vitalityColumns() {
    return derived(
      [this.strength, this.body, this.specie],
      ([$strength, $body, $specie]) => {
        const tbody:number = $body + $specie.attribute_modifiers.body;
        const tstrength:number = $strength + $specie.attribute_modifiers.strength;
        return tstrength + Math.floor(tbody/5);
      }
    )
  }
  get vitalityBaseRecovery() {
    return derived(
      [this.strength, this.body, this.specie, this.characterTraits],
      ([$strength, $body, $specie, $traits]) => {
        let modifier:number = 0;
        const rh:number = $traits.find(t => t.trait.name === 'Rapid Healer' )?.level | 0;
        modifier = modifier + rh;
        if ($traits.find(t => t.trait.name === 'Unhealing')) {
          modifier--;
        }
        const tbody:number = $body + $specie.attribute_modifiers.body;
        const tstrength:number = $strength + $specie.attribute_modifiers.strength;
        return Math.floor((tstrength + Math.floor(tbody/5)) / 2) + modifier;
      }
    )
  }
  get willpowerColumns() {
    return derived(
      [this.spirit, this.mind, this.specie],
      ([$spirit, $mind, $specie]) => {
        const tspirit:number = $spirit + $specie.attribute_modifiers.spirit;
        const tmind:number = $mind + $specie.attribute_modifiers.mind;
        return tspirit + Math.floor(tmind/5);
      }
    )
  }
  get willpowerBaseRecovery() {
    return derived(
      [this.spirit, this.mind, this.specie],
      ([$spirit, $mind, $specie]) => {
        const tspirit:number = $spirit + $specie.attribute_modifiers.spirit;
        const tmind:number = $mind + $specie.attribute_modifiers.mind;
        return Math.floor((tspirit + Math.floor(tmind/5)) / 2);
      }
    )
  }
  get carryBase() {
    return derived(
      [this.strength, this.body, this.specie],
      ([$strength, $body, $specie]) => {
        const tbody:number = $body + $specie.attribute_modifiers.body;
        const tstrength:number = $strength + $specie.attribute_modifiers.strength;
        return tstrength + Math.floor(tbody/2);
      }
    )
  }
  get carryLight() {
    return derived(
      [this.strength, this.body, this.specie],
      ([$strength, $body, $specie]) => {
        const tbody:number = $body + $specie.attribute_modifiers.body;
        const tstrength:number = $strength + $specie.attribute_modifiers.strength;
        return tstrength + Math.floor(tbody/2) + 2;
      }
    )
  }
  get carryMedium() {
    return derived(
      [this.strength, this.body, this.specie],
      ([$strength, $body, $specie]) => {
        const tbody:number = $body + $specie.attribute_modifiers.body;
        const tstrength:number = $strength + $specie.attribute_modifiers.strength;
        return (tstrength + Math.floor(tbody/2)) * 2 + 2;
      }
    )
  }
  get carryHeavy() {
    return derived(
      [this.strength, this.body, this.specie],
      ([$strength, $body, $specie]) => {
        const tbody:number = $body + $specie.attribute_modifiers.body;
        const tstrength:number = $strength + $specie.attribute_modifiers.strength;
        return (tstrength + Math.floor(tbody/2)) * 3 + 2;
      }
    )
  }
  get carryMax() {
    return derived(
      [this.strength, this.body, this.specie, this.characterTraits],
      ([$strength, $body, $specie, $traits]) => {
        const pm:number = $traits.find(t => t.trait.name === 'Pack Mule' )?.level | 0;
        const tbody:number = $body + $specie.attribute_modifiers.body;
        const tstrength:number = $strength + $specie.attribute_modifiers.strength;
        return (tstrength + Math.floor(tbody/2)) * 4 + 2 + (pm * 2);
      }
    )
  }
  get maxTrinkets() {
    return derived(
      [this.spirit, this.specie, this.characterTraits],
      ([$spirit, $specie, $traits]) => {
        const tspirit:number = $spirit + $specie.attribute_modifiers.spirit;
        const power:number = $traits.find(t => t.trait.name === 'Power' )?.level | 0;
        return tspirit + power;
      }
    )
  }
  get totalExperience() {
    return derived(
      [this.specie, this.skillExperience, this.traitExperience, this.attributeExperience],
      ([$specie, $skillExperience, $traitExperience, $attributeExperience]) => {
        return $specie.starting_experience + $skillExperience + $traitExperience + $attributeExperience;
      }
    )
  }
  get weapons() {
    return derived(
      [this.characterItems],
      ([$items]) => {
        return $items.filter(item => isWeapon(item.item) );
      }
    )
  }
  get armours() {
    return derived(
      [this.characterItems],
      ([$items]) => {
        return mapArmour($items);
      }
    )
  }
  get shields() {
    return derived(
      [this.characterItems],
      ([$items]) => {
        return $items.filter(item => isShield(item.item) );
      }
    )
  }
  get attributeExperience() {
    return derived(
      [this.agilityExp, this.bodyExp, this.mindExp, this.spiritExp, this.strengthExp],
      ([$agilityExp, $bodyExp, $mindExp, $spiritExp, $strengthExp]) => {
        return $agilityExp + $bodyExp + $mindExp + $spiritExp + $strengthExp;
      }
    )
  }
  get nativeLanguageBaseLevel() {
    return derived(
      [this.mind],
      ([$mind]) => {
        return $mind + 2;
      }
    )
  }

  increaseAgility() {
    const startValue = get(this.agility);
    this.agility.update((n) => n + 1);
    if (get(this.attributePoints) > 0) {
      this.attributePoints.update((n) => n - 1);
    } else {
      const cost = getAttributeCost(startValue, true);
      this.agilityExp.update((n) => n - cost);
    }
  }
  decreaseAgility() {
    const startValue = get(this.agility);
    this.agility.update((n) => n - 1);
    if (get(this.agilityExp) === 0) {
      this.attributePoints.update((n) => n + 1);
    } else {
      const cost = getAttributeCost(startValue, false);
      this.agilityExp.update((n) => n + cost);
    }
  }

  increaseBody() {
    const startValue = get(this.body);
    this.body.update((n) => n + 1);
    if (get(this.attributePoints) > 0) {
      this.attributePoints.update((n) => n - 1);
    } else {
      const cost = getAttributeCost(startValue, true);
      this.bodyExp.update((n) => n - cost);
    }
  }
  decreaseBody() {
    const startValue = get(this.body);
    this.body.update((n) => n - 1);
    if (get(this.bodyExp) === 0) {
      this.attributePoints.update((n) => n + 1);
    } else {
      const cost = getAttributeCost(startValue, false);
      this.bodyExp.update((n) => n + cost);
    }
  }

  increaseMind() {
    const startValue = get(this.mind);
    this.mind.update((n) => n + 1);
    if (get(this.attributePoints) > 0) {
      this.attributePoints.update((n) => n - 1);
    } else {
      const cost = getAttributeCost(startValue, true);
      this.mindExp.update((n) => n - cost);
    }
  }
  decreaseMind() {
    const startValue = get(this.mind);
    this.mind.update((n) => n - 1);
    if (get(this.mindExp) === 0) {
      this.attributePoints.update((n) => n + 1);
    } else {
      const cost = getAttributeCost(startValue, false);
      this.mindExp.update((n) => n + cost);
    }
  }

  increaseSpirit() {
    const startValue = get(this.spirit);
    this.spirit.update((n) => n + 1);
    if (get(this.attributePoints) > 0) {
      this.attributePoints.update((n) => n - 1);
    } else {
      const cost = getAttributeCost(startValue, true);
      this.spiritExp.update((n) => n - cost);
    }
  }
  decreaseSpirit() {
    const startValue = get(this.spirit);
    this.spirit.update((n) => n - 1);
    if (get(this.spiritExp) === 0) {
      this.attributePoints.update((n) => n + 1);
    } else {
      const cost = getAttributeCost(startValue, false);
      this.spiritExp.update((n) => n + cost);
    }
  }

  increaseStrength() {
    const startValue = get(this.strength);
    this.strength.update((n) => n + 1);
    if (get(this.attributePoints) > 0) {
      this.attributePoints.update((n) => n - 1);
    } else {
      const cost = getAttributeCost(startValue, true);
      this.strengthExp.update((n) => n - cost);
    }
  }
  decreaseStrength() {
    const startValue = get(this.strength);
    this.strength.update((n) => n - 1);
    if (get(this.strengthExp) === 0) {
      this.attributePoints.update((n) => n + 1);
    } else {
      const cost = getAttributeCost(startValue, false);
      this.strengthExp.update((n) => n + cost);
    }
  }

  resetAttributes() {
    this.attributePoints.set(startAttributePoints);
    this.agility.set(0);
    this.body.set(0);
    this.mind.set(0);
    this.spirit.set(0);
    this.strength.set(0);
    this.agilityExp.set(0);
    this.bodyExp.set(0);
    this.mindExp.set(0);
    this.spiritExp.set(0);
    this.strengthExp.set(0);
  }

  addSkill(skill:Skill, tagged:boolean, specialization:string) {
    this.characterSkills.update((n) => {
      let exists:boolean = false;
      for (const s of n) {
        if (s.skill.id === skill.id && (
          (!skill.specialized) || (
            skill.specialized && specialization === s.specialization)
        )) {
          exists = true;
        }
      }
      if (exists) {
        return n;
      }
      return [...n, {
        skill: skill,
        tagged: tagged,
        specialization: specialization,
        level: 0,
        cost: 0
      }];
    });
  }

  removeSkill(skill:CharacterSkill, position:number) {
    this.characterSkills.update((n) => {
      return n.filter((t, i) => i != position);
    });
    this.skillExperience.update((n) => n += skill.cost)
  }

  increaseSkill(skill: CharacterSkill, position: number) {
    let addedCost:number = 0;
    if (skill.level < 3) {
      addedCost = 1;
    } else if (skill.level < 5) {
      addedCost = 2;
    } else if (skill.level < 7) {
      addedCost = 3;
    } else if (skill.level < 9) {
      addedCost = 4;
    } else {
      addedCost = 5;
    }
    if (!skill.tagged) {
      addedCost *= 2;
    }
    skill.cost += addedCost;
    skill.level++;
    this.characterSkills.update((n) => {
      return n.map((s, i) => {
        if (i === position) {
          return skill;
        }
        return s;
      });
    });
    this.skillExperience.update((n) => n -= addedCost)
  }
  decreaseSkill(skill:CharacterSkill, position:number) {
    let lowerCost:number = 0;
    if (skill.level < 4) {
      lowerCost = 1;
    } else if (skill.level < 6) {
      lowerCost = 2;
    } else if (skill.level < 8) {
      lowerCost = 3;
    } else if (skill.level < 10) {
      lowerCost = 4;
    } else {
      lowerCost = 5;
    }
    if (!skill.tagged) {
      lowerCost *= 2;
    }
    skill.cost -= lowerCost;
    skill.level--;
    this.characterSkills.update((n) => {
      return n.map((s, i) => {
        if (i === position) {
          return skill;
        }
        return s;
      });
    });
    this.skillExperience.update((n) => n += lowerCost)
  }
  resetSkillExperience() {
    this.characterSkills.update((n) => {
      return n.map(s => {
        s.level = 0;
        s.cost = 0;
        return s;
      });
    });
    this.skillExperience.set(startSkillExperience);
  }

  addTrait(trait:Trait) {
    this.characterTraits.update((n) => {
      let exists:boolean = false;
      for (const t of n) {
        if (t.trait.id === trait.id) {
          exists = true;
        }
      }
      if (exists) {
        return n;
      }
      let levels:number = 0;
      if (trait.levels) {
        levels = 1;
      }
      return [...n, {
        trait: trait,
        level: levels,
        cost: trait.cost,
        requirementsMet: this.traitRequirementsMet(trait)
      }];
    });
    this.traitExperience.update((n) => n -= trait.cost)
  }

  removeTrait(trait:CharacterTrait, position:number) {
    this.characterTraits.update((n) => {
      return n.filter((t, i) => i != position);
    });
    this.traitExperience.update((n) => n += trait.cost)
  }

  increaseTrait(trait:CharacterTrait, position:number) {
    if (!trait.trait.levels) {
      return;
    }
    let addedCost = trait.trait.cost;
    if (trait.trait.exponential) {
      addedCost = trait.trait.cost * (trait.level + 1);
    }
    this.characterTraits.update((n) => {
      return n.map((t, i) => {
        if (i === position) {
          t.cost += addedCost;
          t.level++;
        }
        return t;
      });
    });
    this.traitExperience.update((n) => n -= addedCost);
  }

  decreaseTrait(trait:CharacterTrait, position:number) {
    if (!trait.trait.levels) {
      return;
    }
    let loweredCost = trait.trait.cost;
    if (trait.trait.exponential) {
      loweredCost = trait.trait.cost * trait.level;
    }
    this.characterTraits.update((n) => {
      return n.map((t, i) => {
        if (i === position) {
          t.cost -= loweredCost;
          t.level--;
        }
        return t;
      });
    });
    this.traitExperience.update((n) => n += loweredCost);
  }

  traitRequirementsMet(trait:Trait):boolean {
    const requirements = trait.requirements;
    const ancestry_attributes = get(this.specie).attribute_modifiers;
    if ((get(this.agility) + ancestry_attributes.agility) < requirements.attributes.agility) {
      return false;
    }
    if ((get(this.body) + ancestry_attributes.body) < requirements.attributes.body) {
      return false;
    }
    if ((get(this.mind) + ancestry_attributes.mind) < requirements.attributes.mind) {
      return false;
    }
    if ((get(this.spirit) + ancestry_attributes.spirit) < requirements.attributes.spirit) {
      return false;
    }
    if ((get(this.strength) + ancestry_attributes.strength) < requirements.attributes.strength) {
      return false;
    }
    if (requirements.skills.length > 0) {
      var pass = false;
      for (const skill of get(this.characterSkills)) {
        for (const req of requirements.skills) {
          if (skill.skill.name === req.name && skill.level >= req.minimumValue) {
            pass = true;
            break;
          }
        }
        if (pass) {
          break;
        }
      }
      if (!pass) {
        return false;
      }
    }
    if (requirements.traits.length > 0) {
      var pass = false;
      for (const trait of get(this.characterTraits)) {
        for (const req of requirements.traits) {
          if (trait.trait.name === req.name && trait.level >= req.minimumValue) {
            pass = true;
            break;
          }
        }
        if (pass) {
          break;
        }
      }
      if (!pass) {
        return false;
      }
    }
    return true;
  }

  updateTraits() {
    var changes = false;
    for (const trait of get(this.characterTraits)) {
      if (trait.requirementsMet !== this.traitRequirementsMet(trait.trait)) {
        changes = true;
        break;
      }
    }
    if (changes) {
      this.characterTraits.update((n) => {
        return n.map((t, i) => {
          t.requirementsMet = this.traitRequirementsMet(t.trait);
          return t;
        });
      });
    }
  }

  addItem(item:Item, amount:number) {
    this.characterItems.update((n) => {
      return [...n, {
        item: item,
        amount: amount
      }];
    });
    this.itemCostTotal.update((n) => n += item.cost * amount)
    this.itemSizeTotal.update((n) => n += item.size * amount)
  }

  removeItem(item:CharacterItem, position:number) {
    this.characterItems.update((n) => {
      return n.filter((t, i) => i != position);
    });
    this.itemCostTotal.update((n) => n -= item.item.cost * item.amount)
    this.itemSizeTotal.update((n) => n -= item.item.size * item.amount)
  }

  importCharacter(character:string) {
    const character_object = JSON.parse(character);
    this.player.set(character_object.player);
    this.name.set(character_object.name);
    this.title.set(character_object.title);
    // Special treatment for specie
    for (const spec of purimiveria_species) {
      if (spec.id === character_object.specie.id) {
        this.specie.set(spec);
      }
    }
    // Standard again
    this.agility.set(character_object.agility);
    this.body.set(character_object.body);
    this.mind.set(character_object.mind);
    this.spirit.set(character_object.spirit);
    this.strength.set(character_object.strength);
    this.nativeLanguage.set(character_object.nativeLanguage || '');
    this.characterItems.set(character_object.characterItems);
    this.characterSkills.set(character_object.characterSkills);
    const importedTraits = [];
    for (const charTrait of character_object.characterTraits) {
      if ('requirementsMet' in charTrait) {
        importedTraits.push(charTrait);
      } else {
        const updatedTrait = purimiveria_traits.find((t) => t.name === charTrait.trait.name);
        charTrait.trait = updatedTrait;
        charTrait.requirementsMet = false;
        importedTraits.push(charTrait);
      }
    }
    this.characterTraits.set(character_object.characterTraits);
    // Internal count
    this.attributePoints.set(character_object.attributePoints);
    this.agilityExp.set(character_object.agilityExp);
    this.bodyExp.set(character_object.bodyExp);
    this.mindExp.set(character_object.mindExp);
    this.spiritExp.set(character_object.spiritExp);
    this.strengthExp.set(character_object.strengthExp);
    this.itemCostTotal.set(character_object.itemCostTotal);
    this.itemSizeTotal.set(character_object.itemSizeTotal);
    this.skillExperience.set(character_object.skillExperience);
    this.traitExperience.set(character_object.traitExperience);
  }

  stringify():string {
    const stringObj = {
      player: get(this.player),
      name: get(this.name),
      title: get(this.title),
      specie: get(this.specie),
      agility: get(this.agility),
      body: get(this.body),
      mind: get(this.mind),
      spirit: get(this.spirit),
      strength: get(this.strength),
      nativeLanguage: get(this.nativeLanguage),
      characterItems: get(this.characterItems),
      characterSkills: get(this.characterSkills),
      characterTraits: get(this.characterTraits),
      // Internal count
      attributePoints: get(this.attributePoints),
      agilityExp: get(this.agilityExp),
      bodyExp: get(this.bodyExp),
      mindExp: get(this.mindExp),
      spiritExp: get(this.spiritExp),
      strengthExp: get(this.strengthExp),
      itemCostTotal: get(this.itemCostTotal),
      itemSizeTotal: get(this.itemSizeTotal),
      skillExperience: get(this.skillExperience),
      traitExperience: get(this.traitExperience),
    };
    return JSON.stringify(stringObj, null, 2)
  }
}

// Export a singleton
export const characterStore = new CharacterStore();
