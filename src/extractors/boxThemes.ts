import { extractIDs, extractNames } from './common';
import type { BoxTheme } from './types';
import { splitRead } from './utils';

const boxThemes: {
	polished: BoxTheme[];
	faithful: BoxTheme[];
} = {
	polished: [],
	faithful: []
};

const NULL_BOXTHEME: BoxTheme = {
	id: null,
	index: -1,
	name: ''
};

const files = await Promise.all(
	['constants/pc_constants.asm', 'data/pc/theme_names.asm'].map((path) => splitRead(path))
);

for (const PF of ['polished', 'faithful'] as const) {
	boxThemes[PF] = extractIDs(
		boxThemes[PF],
		files[0][PF],
		NULL_BOXTHEME,
		undefined,
		'NUM_BILLS_PC_THEMES'
	);
	boxThemes[PF] = extractNames(boxThemes[PF], files[1][PF], 0);
}

export default boxThemes;
