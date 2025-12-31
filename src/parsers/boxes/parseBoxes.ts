import addresses from '$data/addresses.json';
import boxThemes from '$data/boxThemes.json';
import parseBoxAddresses from '$parsers/boxes/parseBoxAddresses';
import { parseBoxMon } from '$parsers/mon/parseMon';
import type { Box } from '$parsers/types';
import { readString } from '$parsers/utils';

function parseBoxes(file: Uint8Array, PF: 'polished' | 'faithful'): Box[] {
	const names = parseBoxNames(file);
	const themes = parseBoxThemes(file, PF);
	const addresses = parseBoxAddresses(file);

	const mons = Array(20)
		.fill(null)
		.map(() => Array(20).fill(null));
	for (let box = 0; box < 20; box++) {
		for (let i = 0; i < 20; i++) {
			if (!addresses[box][i]) continue;
			mons[box][i] = parseBoxMon(file, addresses[box][i], PF);
		}
	}
	const boxes: Box[] = [];
	for (let box = 0; box < 20; box++) {
		boxes.push({
			name: names[box],
			theme: themes[box],
			mons: mons[box]
		});
	}
	return boxes;
}

function parseBoxNames(file: Uint8Array): string[][] {
	const names: string[][] = [];
	for (let box = 0; box < 20; box++) {
		const address = addresses.sBackupNewBox1 + 33 * box + 23;
		names.push(readString(file, address, 9, false));
	}
	return names;
}

function parseBoxThemes(file: Uint8Array, PF: 'polished' | 'faithful'): string[] {
	const themes: string[] = [];
	for (let box = 0; box < 20; box++) {
		themes.push(
			boxThemes[PF].find((b) => b.index === file[addresses.sBackupNewBox1 + 33 * box + 32])!.name
		);
	}
	return themes;
}

export default parseBoxes;
