import { readFileSync, readdirSync } from 'fs';
import split from './lib/split.js';
import reduce from './lib/reduce.js';
import ABILITIES from './abilities.js';

let pokemon = {
	polished: [],
	faithful: []
};

//Paths
const namesASM = '../../polishedcrystal/data/pokemon/names.asm';
const formsASM = '../../polishedcrystal/constants/pokemon_constants.asm';
const monDIR = '../../polishedcrystal/data/pokemon/base_stats/';

const extractNames = (data, PF) => {
	let dexNo = 1;
	for (let lineNo = 0; lineNo < data.length; lineNo++) {
		//Skips undesirable lines
		if (
			!data[lineNo].startsWith('rawchar ') ||
			data[lineNo].includes('?000?') ||
			data[lineNo].includes('Egg') ||
			data[lineNo].includes('?256?')
		) {
			continue;
		}
		//TODO SPECIAL CASE: DUDUNSPARCE
		if (data[lineNo].includes('Dudunsparc')) {
			pokemon[PF].push({
				id: 'dudunsparce',
				name: 'Dudunsparce',
				dexNo: dexNo,
				forms: []
			});
			dexNo++;
			continue;
		}
		pokemon[PF].push({
			id: reduce(data[lineNo].slice(9, -1)),
			name: data[lineNo].slice(9, -1),
			dexNo: dexNo,
			forms: []
		});
		dexNo++;
	}
};

const extractForms = (data, PF) => {
	//Has Form
	for (let lineNo = 0; lineNo < data.length; lineNo++) {
		//Non-Regional Forms
		if (data[lineNo].startsWith('ext_const_def')) {
			//Get the name of the Pokemon
			const name = data[lineNo - 1].slice(2);
			while (data[lineNo].startsWith('ext_const')) {
				//Skip undesirable lines
				if (!data[lineNo].includes(';')) {
					lineNo++;
					continue;
				}
				let form = data[lineNo].split(';');
				form[0] = form[0].slice(10);
				form[0] = form[0].slice(form[0].indexOf('_') + 1).trim();
				form[0] = form[0].slice(0, -5).toLowerCase();
				form[1] = parseInt(form[1].trim().slice(form[1].trim().indexOf('(') + 1, -1), 16);
				let mon = pokemon[PF].find((mon) => mon.id === reduce(name));
				mon.forms.push({
					id: reduce(form[0]),
					name: form[0],
					formNo: form[1],
					type: [],
					abilities: [],
					bsts: [],
					growthRate: [],
					hasGender: null
				});
				lineNo++;
			}
		}

		//Regional Forms
		if (data[lineNo].includes('FORM EQU ')) {
			//IGNORE NO_FORM 0, PLAIN_FORM 1
			if (data[lineNo].includes('NO_FORM') || data[lineNo].includes('PLAIN_FORM')) {
				continue;
			}
			let formName = data[lineNo].slice(4, data[lineNo].indexOf('_')).toLowerCase();
			let formNo = parseInt(data[lineNo].slice(-1));
			//Run through all the Pokemon that have that Regional Form
			lineNo++;
			while (data[lineNo].startsWith('const_skip')) {
				let name = data[lineNo].slice(data[lineNo].indexOf(';') + 2);
				name = name.slice(name.indexOf(' ') + 1);

				//Add it in!
				let mon = pokemon[PF].find((mon) => mon.id === reduce(name));
				mon.forms.push({
					id: reduce(formName),
					name: formName,
					formNo: formNo,
					type: [],
					abilities: [],
					bsts: [],
					growthRate: [],
					hasGender: null
				});
				lineNo++;
			}
		}
	}

	//Plain Form
	let plain = {
		id: 'plain',
		name: 'plain',
		formNo: 1,
		type: [],
		abilities: [],
		bsts: [],
		growthRate: [],
		hasGender: null
	};
	pokemon[PF].forEach((mon) => {
		//Case #1: Pokemon has no forms
		if (mon.forms.length === 0) {
			mon.forms.push({ ...plain });
		}
		//Case #2: Pokemon with alternate forms, none of which have default
		else if (mon.forms.every((form) => form.formNo != 1)) {
			mon.forms.unshift({ ...plain });
		}
	});
};

const extractMon = (data, PF) => {
	//Parse all the data
	let name_form = data
		.find((line) => line.startsWith('abilities_for'))
		.split(',')
		.at(0)
		.split(' ')
		.at(-1);

	let types = data
		.find((line) => line.endsWith('type'))
		.slice(3, -7)
		.split(',');
	types = types.map((type) => reduce(type.trim()));
	if (types[0] === types[1]) {
		types = [types[0]];
	}

	let abilities = data
		.find((line) => line.startsWith('abilities_for'))
		.split(',')
		.slice(1);
	for (let i = 0; i < 3; i++) {
		const ABILITY = ABILITIES[PF].find((ABILITY) => ABILITY.id === reduce(abilities[i]));
		if (ABILITY) {
			abilities[i] = ABILITY.name;
		}
	}

	let bsts = data
		.find((line) => line.endsWith('BST'))
		.slice(3, -9)
		.split(',');
	bsts = bsts.map((bst) => parseInt(bst.trim()));

	const growthRate = reduce(
		data
			.find((line) => line.includes('db GROWTH'))
			.slice(3)
			.split(';')
			.at(0)
			.trim()
	);

	const hasGender =
		data
			.find((line) => line.includes('GENDER'))
			.slice(3)
			.split(',')
			.at(0)
			.trim() === 'GENDER_UNKNOWN'
			? false
			: true;

	//Add it in!
	//Special Case: Armored Mewtwo (labelled as Mewtwo in file)
	//If Polished, Armored Mewtwo is a functional variant
	//If Faithful, Armored Mewtwo is a cosmetic variant
	//Plan of action - if name is Mewtwo and types are Psychic, Steel
	//We must be in the Polished version, so add a special handler
	if (reduce(name_form) === 'mewtwo' && JSON.stringify(types) === '["psychic","steel"]') {
		const mon = pokemon.polished.find((mon) => mon.id === 'mewtwo');
		const form = mon.forms.find((form) => form.id === 'armored');
		form.type = types;
		form.abilities = abilities;
		form.bsts = bsts;
		form.growthRate = growthRate;
		form.hasGender = hasGender;
		return;
	}

	//Case #1: Adding to plain form
	let mon = pokemon[PF].find((mon) => mon.id === reduce(name_form));
	if (mon) {
		const form = mon.forms.find((form) => form.formNo === 1);
		form.type = types;
		form.abilities = abilities;
		form.bsts = bsts;
		form.growthRate = growthRate;
		form.hasGender = hasGender;
		return;
	}

	//Case #2: Adding to functional form
	mon = pokemon[PF].find((mon) => mon.id === reduce(name_form.split('_').slice(0, -1).join('_')));
	if (mon) {
		const form = mon.forms.find((form) => form.id === reduce(name_form.split('_').at(-1)));
		form.type = types;
		form.abilities = abilities;
		form.bsts = bsts;
		form.growthRate = growthRate;
		form.hasGender = hasGender;
		return;
	}
};

const extractCosmetic = (PF) => {
	//Case #3: Adding to cosmetic form: Can only be done after all files are read.
	let mons = pokemon[PF].filter((mon) => {
		return mon.forms.some((form) => form.hasGender === null);
	});
	for (let mon of mons) {
		//Distribute default form data to the rest of the forms
		//TODO: This is predicated on the assumption that a Pokemon cannot have both cosmetic and functional variants
		for (let form of mon.forms.slice(1)) {
			form.type = mon.forms[0].type;
			form.abilities = mon.forms[0].abilities;
			form.bsts = mon.forms[0].bsts;
			form.growthRate = mon.forms[0].growthRate;
			form.hasGender = mon.forms[0].hasGender;
		}
	}
};

//#1: Names, Dex Numbers
let raw = readFileSync(namesASM, 'utf-8');
const namesFILES = split(raw);
extractNames(namesFILES.polished, 'polished');
extractNames(namesFILES.faithful, 'faithful');

//#2: Forms
raw = readFileSync(formsASM, 'utf-8');
const formsFILES = split(raw);
extractForms(formsFILES.polished, 'polished');
extractForms(formsFILES.faithful, 'faithful');

//#3: Type, Abilities, Base Stats, Growth Rate, Gender
const filenames = readdirSync(monDIR);

filenames.map((filename) => {
	raw = readFileSync(monDIR + filename, 'utf-8');
	const monFILES = split(raw);
	extractMon(monFILES.polished, 'polished');
	extractMon(monFILES.faithful, 'faithful');
});

//#3: Special Case: Cosmetic Forms
extractCosmetic('polished');
extractCosmetic('faithful');

export default pokemon;
