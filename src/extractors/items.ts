import type { Item } from './types';
import { applyPalette, extract, splitRead } from './utils';

function extractIDs(items: Item[], IDS: string[]): Item[] {
	let index = 0;
	for (let lineNo = 0; lineNo < IDS.length; lineNo++) {
		if (IDS[lineNo].startsWith('DEF NUM_ITEMS')) break;
		if (!IDS[lineNo].startsWith('const ')) continue;
		items.push({
			id: extract(IDS[lineNo], 'const', ';'),
			index,
			name: '',
			description: '',
			category: '',
			spritePath: ''
		});
		index++;
	}
	return items;
}

function extractNames(items: Item[], NAMES: string[]): Item[] {
	let index = 0;
	for (let lineNo = 0; lineNo < NAMES.length; lineNo++) {
		if (!NAMES[lineNo].includes('"')) continue;
		items.find((i) => i.index === index)!.name = NAMES[lineNo].split('"').at(1)!;
		index++;
	}
	return items;
}

function extractDescs(items: Item[], DESCS: string[]): Item[] {
	let index = 1;
	for (let lineNo = 0; lineNo < DESCS.length; lineNo++) {
		if (DESCS[lineNo].includes('NUM_ITEMS')) break;
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
		items.find((i) => i.index === index)!.description = description.slice(0, -1);
		index++;
	}
	return items;
}

function extractAttrs(items: Item[], ATTRS: string[]): Item[] {
	let index = 1;
	for (let lineNo = 0; lineNo < ATTRS.length; lineNo++) {
		if (ATTRS[lineNo].includes('NUM_ITEMS')) break;
		if (!ATTRS[lineNo].startsWith('item_attribute')) continue;
		items.find((i) => i.index === index)!.category = ATTRS[lineNo].split(',').at(3)!.slice(1);
		index++;
	}
	return items;
}

function extractPaths(items: Item[], PTRS: string[], PATHS: string[]): Item[] {
	let index = 0;
	for (let lineNo = 0; lineNo < PTRS.length; lineNo++) {
		if (PTRS[lineNo].includes('NUM_ITEMS')) break;
		if (!PTRS[lineNo].includes('dba')) continue;
		const pointer = PTRS[lineNo].slice(4);
		let pathStart = PATHS.findIndex((line) => line.includes(`${pointer}::`));
		while (!PATHS[pathStart].includes('"')) pathStart++;
		const spritePath = PATHS[pathStart].split('"').at(1)!.replace('2bpp.lz', 'png');
		items.find((i) => i.index === index)!.spritePath = spritePath;
		index++;
	}
	return items;
}

function extractPNGs(items: Item[], PALS: string[]): void {
	let index = 0;
	for (let lineNo = 0; lineNo < PALS.length; lineNo++) {
		if (!PALS[lineNo].startsWith('RGB')) continue;
		const color1 = PALS[lineNo]
			.slice(4)
			.split(', ')
			.map((x) => parseInt(x));
		const color2 = PALS[lineNo + 1]
			.slice(4)
			.split(', ')
			.map((x) => parseInt(x));
		const spritePath = items.find((i) => i.index === index)!.spritePath;
		lineNo++;
		//Skip Park Ball
		if (index === 0) {
			index++;
			continue;
		}
		applyPalette(spritePath, color1, color2);
		index++;
	}
	return;
}

const IDS = splitRead('constants/item_constants.asm');
const NAMES = splitRead('data/items/names.asm');
const DESCS = splitRead('data/items/descriptions.asm');
const ATTRS = splitRead('data/items/attributes.asm');
const PTRS = splitRead('data/items/icon_pointers.asm');
const PATHS = splitRead('gfx/items.asm');
const PALS = splitRead('gfx/items/items.pal');

const items: {
	polished: Item[];
	faithful: Item[];
} = {
	polished: [],
	faithful: []
};

for (const PF of ['polished', 'faithful'] as const) {
	items[PF] = extractIDs(items[PF], IDS[PF]);
	items[PF] = extractNames(items[PF], NAMES[PF]);
	items[PF] = extractDescs(items[PF], DESCS[PF]);
	items[PF] = extractAttrs(items[PF], ATTRS[PF]);
	items[PF] = extractPaths(items[PF], PTRS[PF], PATHS[PF]);
	extractPNGs(items[PF], PALS[PF]);
}

export default items;
