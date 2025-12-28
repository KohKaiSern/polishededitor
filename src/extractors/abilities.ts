import { extractDescs, extractIDs, extractNames } from './common';
import { splitRead } from './utils';
import type { Ability } from './types';

const abilities: {
  polished: Ability[];
  faithful: Ability[];
} = {
  polished: [],
  faithful: []
};

const NULL_ABILITY: Ability = {
  id: null,
  index: -1,
  name: '',
  description: ''
};

const files = await Promise.all([
  'constants/ability_constants.asm',
  'data/abilities/names.asm',
  'data/abilities/descriptions.asm'
].map(path => splitRead(path)))

for (const PF of ['polished', 'faithful'] as const) {
  abilities[PF] = extractIDs(abilities[PF], files[0][PF], NULL_ABILITY);
  abilities[PF] = extractNames(abilities[PF], files[1][PF], 0);
  abilities[PF] = extractDescs(abilities[PF], files[2][PF], 0);
}

export default abilities;
