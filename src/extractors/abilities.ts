import type { Ability } from "./types";
import { splitRead, extract } from "./utils";

function extractIDs(abilities: Ability[], IDS: string[]): Ability[] {
  let index = 0;
  for (let lineNo = 0; lineNo < IDS.length; lineNo++) {
    if (!IDS[lineNo].startsWith('const ')) continue;
    abilities.push({
      id: extract(IDS[lineNo], 'const', ';'),
      index,
      name: '',
      description: '',
    });
    index++;
  }
  return abilities;
}

function extractNames(abilities: Ability[], NAMES: string[]): Ability[] {
  let index = 0;
  for (let lineNo = 0; lineNo < NAMES.length; lineNo++) {
    if (!NAMES[lineNo].includes('"')) continue;
    abilities.find((i) => i.index === index)!.name = NAMES[lineNo].split('"').at(1)!;
    index++;
  }
  return abilities;
}

function extractDescs(abilities: Ability[], DESCS: string[]): Ability[] {
  let index = 0;
  for (let lineNo = 0; lineNo < DESCS.length; lineNo++) {
    if (DESCS[lineNo].includes('NUM_ABILITIES')) break;
    if (!DESCS[lineNo].includes('dw')) continue;
    const pointer = DESCS[lineNo].slice(3);
    let descIndex = DESCS.findIndex((line) => line === `${pointer}:`) + 1;
    let description = '';
    while (!DESCS[descIndex].includes('"')) descIndex++;
    while (DESCS[descIndex].includes('"')) {
      description += DESCS[descIndex].split('"').at(1)!;
      if (description.at(-1)! === '-') {
        description = description.slice(0, -1);
      } else {
        description += ' ';
      }
      descIndex++;
    }
    abilities.find((i) => i.index === index)!.description = description.slice(0, -1);
    index++;
  }
  return abilities;
}

const IDS = splitRead('constants/ability_constants.asm')
const NAMES = splitRead('data/abilities/names.asm')
const DESCS = splitRead('data/abilities/descriptions.asm')

const abilities: {
  polished: Ability[];
  faithful: Ability[];
} = {
  polished: [],
  faithful: []
}

for (const PF of ['polished', 'faithful'] as const) {
  abilities[PF] = extractIDs(abilities[PF], IDS[PF])
  abilities[PF] = extractNames(abilities[PF], NAMES[PF])
  abilities[PF] = extractDescs(abilities[PF], DESCS[PF])
}

export default abilities
