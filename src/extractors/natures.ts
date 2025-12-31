import { extractIDs, extractNames } from './common';
import type { Nature } from './types';
import { splitRead } from './utils';

const natures: {
	polished: Nature[];
	faithful: Nature[];
} = {
	polished: [],
	faithful: []
};

const NULL_NATURE: Nature = {
	id: null,
	index: -1,
	name: ''
};

const files = await Promise.all(
	['constants/nature_constants.asm', 'data/natures.asm'].map((path) => splitRead(path))
);

for (const PF of ['polished', 'faithful'] as const) {
	natures[PF] = extractIDs(natures[PF], files[0][PF], NULL_NATURE);
	natures[PF] = extractNames(natures[PF], files[1][PF], 0);
}

export default natures;
