import { readFileSync } from 'fs';
import split from './lib/split.js';
import reduce from './lib/reduce.js';
import paths from './lib/paths.js';

let abilities = {
	polished: [],
	faithful: []
};

const extractNames = (data, PF) => {
	data = data.filter((line) => line.includes('rawchar'));
	data = data.map((line) => line.slice(0, -1).split('"').at(-1));
	for (let ability of data.slice(1)) {
		abilities[PF].push({
			id: reduce(ability),
			name: ability
		});
	}
};

const extractDescriptions = (data, PF) => {
	for (let i = 0; i < data.length; i++) {
		let abilitiesArr = [];
		let description = '';
		//Once we hit a line that has signals a description
		while (data[i].endsWith('Description:')) {
			//We add in every ability that the description applies to
			abilitiesArr.push(reduce(data[i].replace('Description:', '')));
			i++;
		}
		//Now we actually grab the description
		while (abilitiesArr.length > 0 && data[i] != 'done') {
			description += data[i].slice(0, -1).split('"').at(-1);
			if (description.at(-1) === '-') {
				description = description.slice(0, -1);
				i++;
				continue;
			}
			description += ' ';
			i++;
		}
		//Now we add it to abilities
		for (let entry of abilitiesArr) {
			let ability = abilities[PF].find((ability) => ability['id'] === entry);
			if (ability) {
				ability['description'] = description.trim();
			}
		}
	}
};

//#1: Names
let raw = readFileSync(paths.abilities.names, 'utf-8');
const namesFILES = split(raw);
extractNames(namesFILES.polished, 'polished');
extractNames(namesFILES.faithful, 'faithful');

//#2: Descriptions
raw = readFileSync(paths.abilities.descriptions, 'utf-8');
const descriptionsFILES = split(raw);
extractDescriptions(descriptionsFILES.polished, 'polished');
extractDescriptions(descriptionsFILES.faithful, 'faithful');

export default abilities;
