import type { Species, Form } from './types';
import { extract, extractDescs, extractIDs, extractNames, splitRead } from './utils';

function extractForms(pokemon: Species[], IDS: string[]): Species[] {
  //First, extract all the cosmetic & functional forms with their respective form numbers.
  const cosmetic = []
  const functional = []
  //Needed to get Red Gyarados's Form Number
  let NUM_MAGIKARP = 1
  let lineNo = 0
  while (!IDS[lineNo].includes('FIRST_VARIANT_FORM_MON')) {
    const match = IDS[lineNo].match(/^ext_const.*?([A-Z][A-Z_]+).*\((.*)\)/)
    if (!match) {
      lineNo++
      continue
    }
    if (IDS[lineNo].includes('MAGIKARP')) NUM_MAGIKARP++;
    cosmetic.push({
      id: match.at(1)!,
      formNo: parseInt(match.at(2)!, 16)
    })
    lineNo++
  }
  while (lineNo < IDS.length) {
    lineNo++
  }
  return pokemon
}

const IDS = splitRead('constants/pokemon_constants.asm');
const NAMES = splitRead('data/pokemon/names.asm');

const pokemon: {
  polished: Species[];
  faithful: Species[];
} = {
  polished: [],
  faithful: []
};

for (const PF of ['polished', 'faithful'] as const) {
  pokemon[PF] = extractIDs(pokemon[PF], IDS[PF], { id: '', index: -1, name: '', forms: [] }, 1, 'NUM_SPECIES')
  pokemon[PF] = extractNames(pokemon[PF], NAMES[PF], 0)
  pokemon[PF] = extractForms(pokemon[PF], IDS[PF])
}

export default pokemon;
