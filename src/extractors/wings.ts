import { extractIDs, extractNames, extractPNGs } from './common';
import type { Wing } from './types';
import { splitRead } from './utils';

const wings: {
	polished: Wing[];
	faithful: Wing[];
} = {
	polished: [],
	faithful: []
};

const NULL_WING: Wing = {
	id: null,
	index: -1,
	name: '',
	spritePath: 'gfx/items/wing.png'
};

const files = await Promise.all(
	['constants/item_constants.asm', 'data/items/wing_names.asm', 'gfx/items/wings.pal'].map((path) =>
		splitRead(path)
	)
);

for (const PF of ['polished', 'faithful'] as const) {
	wings[PF] = extractIDs(wings[PF], files[0][PF], NULL_WING, 'NUM_APRICORNS', 'NUM_WINGS');
	wings[PF] = extractNames(wings[PF], files[1][PF], 0);
	wings[PF] = extractPNGs(wings[PF], files[2][PF], 0);
}

export default wings;
