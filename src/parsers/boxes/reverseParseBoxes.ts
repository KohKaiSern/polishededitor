import addresses from '$data/addresses.json';
import boxThemes from '$data/boxThemes.json';
import checksumBoxMon from '$parsers/boxes/checksumBoxMon';
import parseBoxAddresses from '$parsers/boxes/parseBoxAddresses';
import { reverseParseBoxMon } from '$parsers/mon/reverseParseMon';
import type { Box } from '$parsers/types';
import { writeString, insert } from '$parsers/utils';

function reverseParseBoxes(
	file: Uint8Array,
	boxes: Box[],
	PF: 'polished' | 'faithful'
): Uint8Array {
	file = reverseParseBoxNames(file, boxes);
	file = reverseParseBoxThemes(file, boxes, PF);
	file = reverseParseBoxAddresses(file, boxes);
	const addresses = parseBoxAddresses(file);
	for (let box = 0; box < 20; box++) {
		for (let i = 0; i < 20; i++) {
			if (boxes[box].mons[i]) {
				file = reverseParseBoxMon(file, addresses[box][i], boxes[box].mons[i], PF);
				file = checksumBoxMon(file, addresses[box][i]);
			}
		}
	}
	return file;
}

function reverseParseBoxNames(file: Uint8Array, boxes: Box[]): Uint8Array {
	for (let box = 0; box < 20; box++) {
		file = writeString(file, addresses.sBackupNewBox1 + 33 * box + 23, 9, boxes[box].name, false);
	}
	return file;
}

function reverseParseBoxThemes(
	file: Uint8Array,
	boxes: Box[],
	PF: 'polished' | 'faithful'
): Uint8Array {
	for (let box = 0; box < 20; box++) {
		file[addresses.sBackupNewBox1 + 33 * box + 32] = boxThemes[PF].find(
			(b) => b.name === boxes[box].theme
		)!.index;
	}
	return file;
}

//For convenience:
//Bitflags will always be unset from Boxes 1-10, and set for Boxes 11-20.
function reverseParseBoxAddresses(file: Uint8Array, boxes: Box[]): Uint8Array {
	let index = 1;
	for (let box = 0; box < 20; box++) {
		//Indexes
		for (let i = 0; i < 20; i++) {
			if (index === 201) index = 1;
			if (!boxes[box].mons[i]) {
				file[addresses.sBackupNewBox1 + 33 * box + i] = 0;
			} else {
				file[addresses.sBackupNewBox1 + 33 * box + i] = index;
				index++;
			}
		}
		//Bitflags
		if (box < 11) {
			file = insert(file, addresses.sBackupNewBox1 + 33 * box + 20, 3, 0);
		} else {
			file = insert(file, addresses.sBackupNewBox1 + 33 * box + 20, 3, 0xffff0f);
		}
	}
	return file;
}

export default reverseParseBoxes;
