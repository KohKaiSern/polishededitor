import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import type { Base } from './types';

//This function acts as a pre-processor to all the used files.
//Its main job is to split a file into two versions, one with
//the Polished information and one with the Faithful information.
//In addition, it performs some global string replacements and removals.
export function splitRead(path: string): { polished: string[]; faithful: string[] } {
	const files: { polished: string[]; faithful: string[] } = { polished: [], faithful: [] };
	const contents = readFileSync(import.meta.dirname + '/../../polishedcrystal/' + path, 'utf-8')
		.split('\n')
		.map((line) =>
			line
				.replaceAll('#', 'Poké')
				.replaceAll('Poke', 'Poké')
				.replaceAll('@', '')
				.replaceAll('¯', ' ')
				.replaceAll('PSYCHIC_M', 'PSYCHIC')
				.trim()
		);

	for (let lineNo = 0; lineNo < contents.length; lineNo++) {
		//Upon encountering a faithful check,
		if (contents[lineNo].includes('if DEF(FAITHFUL)')) {
			lineNo++;
			//Collect all the faithful data.
			while (contents[lineNo] != 'else' && contents[lineNo] != 'endc') {
				files.faithful.push(contents[lineNo]);
				lineNo++;
			}
			//Check for a polished block.
			if (contents[lineNo] === 'endc') continue;
			lineNo++;
			//If there is one, collect all the polished data.
			while (contents[lineNo] != 'endc') {
				files.polished.push(contents[lineNo]);
				lineNo++;
			}
		}
		//Vice versa:
		else if (contents[lineNo].includes('if !DEF(FAITHFUL)')) {
			lineNo++;
			while (contents[lineNo] != 'else' && contents[lineNo] != 'endc') {
				files.polished.push(contents[lineNo]);
				lineNo++;
			}
			if (contents[lineNo] === 'endc') continue;
			lineNo++;
			while (contents[lineNo] != 'endc') {
				files.faithful.push(contents[lineNo]);
				lineNo++;
			}
		}
		//Normal lines are added to both arrays.
		else {
			files.polished.push(contents[lineNo]);
			files.faithful.push(contents[lineNo]);
		}
	}
	return files;
}

export function writeJSON(name: string, obj: object): void {
	writeFileSync(import.meta.dirname + '/../../data/' + name + '.json', JSON.stringify(obj));
}

//This function splices strings based on two barrier substrings.
//For this function to work, the barrier substrings must be unique.
export function extract(str: string, sub1: string, sub2: string): string {
	return str.split(sub1).at(1)!.split(sub2).at(0)!.trim();
}

//Applies a palette to a 2-bit-per-pixel PNG.
export async function applyPalette(
	spritePath: string,
	color1: number[],
	color2: number[]
): Promise<void> {
	const data = await sharp(import.meta.dirname + '/../../polishedcrystal/' + spritePath)
		.greyscale()
		.raw()
		.toBuffer();
	const metadata = await sharp(
		import.meta.dirname + '/../../polishedcrystal/' + spritePath
	).metadata();

	const levels = Array.from(new Set(data)).sort((a, b) => a - b);

	const palette = [[0, 0, 0], color2.map((c) => c * 8), color1.map((c) => c * 8), [255, 255, 255]];

	const RGBData = Buffer.alloc(data.length * 3);
	for (let i = 0; i < data.length; i++) {
		const [r, g, b] = palette[levels.indexOf(data[i])];
		RGBData[i * 3] = r;
		RGBData[i * 3 + 1] = g;
		RGBData[i * 3 + 2] = b;
	}

	sharp(RGBData, {
		raw: { width: metadata.width!, height: metadata.height!, channels: 3 }
	})
		.png()
		.toFile(import.meta.dirname + '/../../' + spritePath);
}

//Common Extractors

export function extractIDs<T extends Base>(
	data: T[],
	IDS: string[],
	empty: T,
	start: number,
	stop?: string
): T[] {
	let index = start;
	for (let lineNo = 0; lineNo < IDS.length; lineNo++) {
		if (stop) if (IDS[lineNo].includes(stop)) break;
		if (!IDS[lineNo].startsWith('const ')) continue;
		data.push({
			...empty,
			id: extract(IDS[lineNo], 'const', ';'),
			index
		});
		index++;
	}
	return data;
}

export function extractNames<T extends Base>(data: T[], NAMES: string[], start: number): T[] {
	let index = start;
	for (let lineNo = 0; lineNo < NAMES.length; lineNo++) {
		if (!NAMES[lineNo].includes('"')) continue;
		data.find((i) => i.index === index)!.name = NAMES[lineNo].split('"').at(1)!;
		index++;
	}
	return data;
}

export function extractDescs<T extends Base & { description: string }>(
	data: T[],
	DESCS: string[],
	start: number,
	stop?: string
): T[] {
	let index = start;
	for (let lineNo = 0; lineNo < DESCS.length; lineNo++) {
		if (stop) if (DESCS[lineNo].includes(stop)) break;
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
		data.find((i) => i.index === index)!.description = description.slice(0, -1);
		index++;
	}
	return data;
}
