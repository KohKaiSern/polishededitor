import type { Ability } from './types';
import { extractDescs, extractIDs, extractNames, splitRead } from './utils';

const IDS = splitRead('constants/ability_constants.asm');
const NAMES = splitRead('data/abilities/names.asm');
const DESCS = splitRead('data/abilities/descriptions.asm');

const abilities: {
	polished: Ability[];
	faithful: Ability[];
} = {
	polished: [],
	faithful: []
};

for (const PF of ['polished', 'faithful'] as const) {
	abilities[PF] = extractIDs(
		abilities[PF],
		IDS[PF],
		{ id: '', index: -1, name: '', description: '' },
		0
	);
	abilities[PF] = extractNames(abilities[PF], NAMES[PF], 0);
	abilities[PF] = extractDescs(abilities[PF], DESCS[PF], 0, 'NUM_ABILITIES');
}

export default abilities;
