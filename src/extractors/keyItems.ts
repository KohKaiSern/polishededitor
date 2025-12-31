import { extractDescs, extractIDs, extractNames, extractPaths } from './common';
import type { KeyItem } from './types';
import { applyPalette, splitRead } from './utils';

function extractPNGs(keyItems: KeyItem[], PALS: string[]): KeyItem[] {
	let index = 1;
	for (let lineNo = 0; lineNo < PALS.length; lineNo++) {
		//TODO: More sophisticated splits
		if (PALS[lineNo].includes('HGSS')) lineNo += 9;
		//END OF TODO
		if (!PALS[lineNo].startsWith('RGB')) continue;
		const color1 = PALS[lineNo].match(/\d+/g)!.slice(0, 3).map(Number);
		const color2 = PALS[lineNo + 1].match(/\d+/g)!.slice(0, 3).map(Number);
		const keyItem = keyItems.find((i) => i.index === index)!;
		applyPalette(keyItem.spritePath, `gfx/items/${keyItem.id}.png`, color1, color2);
		keyItem.spritePath = `gfx/items/${keyItem.id}.png`;
		lineNo++;
		index++;
	}
	return keyItems;
}

const keyItems: {
	polished: KeyItem[];
	faithful: KeyItem[];
} = {
	polished: [],
	faithful: []
};

const NULL_KEY_ITEM: KeyItem = {
	id: null,
	index: -1,
	name: '',
	description: '',
	spritePath: ''
};

const files = await Promise.all(
	[
		'constants/item_constants.asm',
		'data/items/key_names.asm',
		'data/items/descriptions.asm',
		'data/items/icon_pointers.asm',
		'gfx/items.asm',
		'gfx/items/key_items.pal'
	].map((path) => splitRead(path))
);

for (const PF of ['polished', 'faithful'] as const) {
	keyItems[PF] = extractIDs(
		keyItems[PF],
		files[0][PF],
		NULL_KEY_ITEM,
		'NUM_CANDIES',
		'NUM_KEY_ITEMS'
	);
	keyItems[PF] = extractNames(keyItems[PF], files[1][PF], 0);
	keyItems[PF] = extractDescs(keyItems[PF], files[2][PF], 1, 'NUM_ITEMS', 'NUM_KEY_ITEMS');
	keyItems[PF] = extractPaths(
		keyItems[PF],
		files[3][PF],
		files[4][PF],
		0,
		'NUM_ITEMS',
		'NUM_KEY_ITEMS'
	);
	keyItems[PF] = extractPNGs(keyItems[PF], files[5][PF]);
}

export default keyItems;
