import pokemon from '$data/pokemon.json';
import moves from '$data/moves.json';
import items from '$data/items.json';
import { hex2bin, bin2hex, getNatureNo } from '$components/helpers.js';

//Parses one Pokemon object and edits the fileHex file as necessary.
const reverseParseMon = (fileHex, address, mon, PF) => {
	//Byte #1, Byte #22: Species, 9th-Bit, Form
	const dexNo = pokemon[PF].findIndex((pokemon) => pokemon.name === mon.species) + 1;

	//9th-Bit Activated
	let byte22 = hex2bin(fileHex[address + 21]);
	if (dexNo > 254) {
		fileHex[address] = (dexNo - 254).toString(16).padStart(2, '0');
		byte22 = byte22.slice(0, 2) + '1' + byte22.slice(3);
	} else {
		fileHex[address] = dexNo.toString(16).padStart(2, '0');
		byte22 = byte22.slice(0, 2) + '0' + byte22.slice(3);
	}
	//Form
	const form = pokemon[PF][dexNo - 1].forms.find((form) => form.name === mon.form);
	const formNo = form.formNo.toString(2).padStart(5, '0');
	byte22 = byte22.slice(0, 3) + formNo;
	fileHex[address + 21] = bin2hex(byte22);

	//Byte #2: Held Item
	const item = items[PF].find((item) => item.name === mon.heldItem);
	if (item) {
		fileHex[address + 1] = item.itemNo.toString(16).padStart(2, '0');
	} else {
		fileHex[address + 1] = '00';
	}

	//Byte #3-6: Moveset

	for (let i = 0; i < 4; i++) {
		if (mon.moves[i] === 'Empty') {
			fileHex[address + 2 + i] = '00';
		} else {
			const move = moves[PF].find((move) => move.name === mon.moves[i]);
			fileHex[address + 2 + i] = move.moveNo.toString(16).padStart(2, '0');
		}
	}

	//Byte #7-8: ID [UNSUPPORTED]

	//Byte #9-11: EXP

	const exp = mon.exp.toString(16).padStart(6, '0');
	fileHex[address + 8] = exp.slice(0, 2);
	fileHex[address + 9] = exp.slice(2, 4);
	fileHex[address + 10] = exp.slice(4);

	//Byte #12-17: EVs

	for (let i = 0; i < 6; i++) {
		fileHex[address + 11 + i] = mon.evs.map((ev) => ev.toString(16).padStart(2, '0')).at(i);
	}

	//Byte #18-20: DVs

	const dvs = mon.dvs.map((dv) => dv.toString(16));
	fileHex[address + 17] = dvs[0] + dvs[1];
	fileHex[address + 18] = dvs[2] + dvs[3];
	fileHex[address + 19] = dvs[4] + dvs[5];

	//Byte #21: Ability, Nature, Shininess

	let byte21 = hex2bin(fileHex[address + 20]);
	const abilityNo = form.abilities.findIndex((ability) => ability === mon.ability);
	byte21 = byte21.at(0) + (abilityNo + 1).toString(2).padStart(2, '0') + byte21.slice(3);
	byte21 = (mon.shininess === 'Shiny' ? '1' : '0') + byte21.slice(1);
	byte21 = byte21.slice(0, 3) + getNatureNo(mon.nature).toString(2).padStart(5, '0');
	fileHex[address + 20] = bin2hex(byte21);

	//Byte #22: Gender, isEgg

	if (!(mon.gender === 'Genderless')) {
		if (mon.gender === 'Male') {
			byte22 = '0' + byte22.slice(1);
		} else {
			byte22 = '1' + byte22.slice(1);
		}
	}

	if (mon.isEgg) {
		byte22 = byte22.at(0) + '1' + byte22.slice(2);
	} else {
		byte22 = byte22.at(0) + '0' + byte22.slice(2);
	}

	fileHex[address + 21] = bin2hex(byte22);

	//Byte #23: PP Ups TODO

	//Byte #24: Happiness

	if (mon.isEgg) {
		fileHex[address + 23] = mon.hatchCycles.toString(16).padStart(2, '0');
	} else {
		fileHex[address + 23] = mon.happiness.toString(16).padStart(2, '0');
	}

	//Byte #25: Pokerus [UNSUPPORTED]

	//Byte #26: Caught Ball, Caught Time, Caught Data [UNSUPPORTED]

	//Byte #27: Caught Level [UNSUPPORTED]

	//Byte #28: Caught Location [UNSUPPORTED]

	////Byte #29: Level

	fileHex[address + 28] = mon.level.toString(16).padStart(2, '0');

	//Byte #30: Hyper Training TODO

	//Byte #31-#32: Extra [UNSUPPORTED]

	//Byte #33-42: Nickname TODO

	//Byte #43-49: Original Trainer [UNSUPPORTED]
	return fileHex;
};

export default reverseParseMon;
