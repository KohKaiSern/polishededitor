import pokemon from '$data/pokemon.json';
import abilities from '$data/abilities.json';
import moves from '$data/moves.json';
import items from '$data/items.json';
import { hex2bin, getNature } from '$components/helpers.js';

//Parses one Pokemon's worth of data into a Pokemon Object
const parseMon = (fileHex, address, PF) => {
	const mon = {};

	//Byte #1, Byte #22: Species, 9th-Bit, Form
	let dexNo = parseInt(fileHex[address], 16);

	//Check 9th-Bit
	const byte22 = hex2bin(fileHex[address + 21]);
	if (byte22.at(2) === '1') {
		dexNo += 254;
	}

	let formNo = parseInt(byte22.slice(3), 2);
	let species = pokemon[PF][dexNo - 1];

	let form = species.forms.find((form) => form.formNo === formNo);

	if (!form) {
		form = species.forms[0];
	}

	mon.species = species.name;
	mon.form = form.name;

	//Byte #2: Held Item

	if (fileHex[address + 1] === '00') {
		mon.heldItem = 'None';
	} else {
		mon.heldItem = items[PF][parseInt(fileHex[address + 1], 16) - 1].name;
	}

	//Byte #3-6: Moveset

	let moveset = [];
	for (let i = 2; i < 6; i++) {
		if (fileHex[address + i] === '00') {
			moveset.push(null);
			continue;
		}
		moveset.push(moves[PF][parseInt(fileHex[address + i], 16) - 1].name);
	}

	mon.moves = moveset;

	//Byte #7-8: ID [UNSUPPORTED]

	//Byte #9-11: EXP

	mon.exp = parseInt(fileHex[address + 8] + fileHex[address + 9] + fileHex[address + 10], 16);

	//Byte #12-17: EVs

	mon.evs = [
		parseInt(fileHex[address + 11], 16),
		parseInt(fileHex[address + 12], 16),
		parseInt(fileHex[address + 13], 16),
		parseInt(fileHex[address + 14], 16),
		parseInt(fileHex[address + 15], 16),
		parseInt(fileHex[address + 16], 16)
	];

	//Byte #18-20: DVs

	mon.dvs = [
		parseInt(fileHex[address + 17].at(0), 16),
		parseInt(fileHex[address + 17].at(1), 16),
		parseInt(fileHex[address + 18].at(0), 16),
		parseInt(fileHex[address + 18].at(1), 16),
		parseInt(fileHex[address + 19].at(0), 16),
		parseInt(fileHex[address + 19].at(1), 16)
	];

	//Byte #21: Ability, Nature, Shininess

	const byte21 = hex2bin(fileHex[address + 20]);

	mon.shininess = byte21.at(0) === '1' ? 'Shiny' : 'Not Shiny';

	mon.nature = getNature(parseInt(byte21.slice(3), 2));

	const ability = abilities[PF].find(
		(ability) => form.abilities.at(parseInt(byte21.slice(1, 3), 2) - 1) === ability.name
	);
	mon.ability = ability.name;

	//Byte #22: Gender, isEgg

	mon.isEgg = byte22.at(1) === '0' ? false : true;

	if (form.hasGender) {
		mon.gender = byte22.at(0) === '0' ? 'Male' : 'Female';
	} else {
		mon.gender = 'Genderless';
	}

	//Byte #23: PP Ups TODO

	//Byte #24: Happiness / Hatch Cycles

	if (mon.isEgg) {
		mon.hatchCycles = parseInt(fileHex[address + 23], 16);
		mon.happiness = null;
	} else {
		mon.hatchCycles = null;
		mon.happiness = parseInt(fileHex[address + 23], 16);
	}

	//Byte #25: Pokerus [UNSUPPORTED]

	//Byte #26: Caught Ball, Caught Time, Caught Data [UNSUPPORTED]

	//Byte #27: Caught Level [UNSUPPORTED]

	//Byte #28: Caught Location [UNSUPPORTED]

	//Byte #29: Level

	mon.level = parseInt(fileHex[address + 28], 16);

	//Byte #30: Hyper Training TODO

	//Byte #31-#32: Extra [UNSUPPORTED]

	//Byte #33-42: Nickname TODO

	//Byte #43-49: Original Trainer [UNSUPPORTED]
	return mon;
};

export default parseMon;
