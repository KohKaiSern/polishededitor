import { readFileSync } from 'fs';
import split from './lib/split.js';
import reduce from './lib/reduce.js';

let items = {
	polished: [],
	faithful: []
};

//Paths
const namesASM = '../../polishedcrystal/data/items/names.asm';
const descriptionsASM = '../../polishedcrystal/data/items/descriptions.asm';
const attributesASM = '../../polishedcrystal/data/items/attributes.asm';

const extractNames = (data, PF) => {
	data = data.filter((line) => line.startsWith('li '));
	data = data.map((line) => line.slice(0, -1).split('"').at(-1));
	for (let item of data.slice(1)) {
		items[PF].push({
			id: reduce(item),
			name: item,
			itemNo: data.indexOf(item)
		});
	}
};

const extractDescriptions = (data, PF) => {
	for (let i = 0; i < data.length; i++) {
		let itemsArr = [];
		let description = '';
		//Once we hit a line that has signals a description
		while (data[i].endsWith('Desc:')) {
			//We add in every item that the description applies to
			itemsArr.push(reduce(data[i].replace('Desc:', '')));
			i++;
		}
		//Now we actually grab the description
		while (itemsArr.length > 0 && data[i] != 'done') {
			description += data[i].slice(0, -1).split('"').at(-1);
			if (description.at(-1) === '-') {
				description = description.slice(0, -1);
				i++;
				continue;
			}
			description += ' ';
			i++;
		}
		//Now we add it to items
		for (let entry of itemsArr) {
			let item = items[PF].find((item) => item.id === entry);
			if (item) {
				item.description = description.trim();
			}
		}
	}
};

const coverInconsistencies = (PF) => {
	let altPF = PF === 'polished' ? 'faithful' : 'polished';
	for (let item of items[PF]) {
		if (!item.hasOwnProperty('description')) {
			item.description = items[altPF][item.itemNo - 1].description;
		}
	}
};

const extractAttributes = (data, PF) => {
	data = data.filter((line) => line.startsWith('item_attribute '));
	data = data.map((line) => reduce(line.split(',').at(3)));
	for (let i = 0; i < data.length; i++) {
		items[PF][i].type = data[i];
	}
};

//#1: Names
let raw = readFileSync(namesASM, 'utf-8');
const namesFILES = split(raw);
extractNames(namesFILES.polished, 'polished');
extractNames(namesFILES.faithful, 'faithful');

//#2: Descriptions
raw = readFileSync(descriptionsASM, 'utf-8');
const descriptionsFILES = split(raw);
extractDescriptions(descriptionsFILES.polished, 'polished');
extractDescriptions(descriptionsFILES.faithful, 'faithful');

coverInconsistencies('polished');
coverInconsistencies('faithful');

//#3: Attributes
raw = readFileSync(attributesASM, 'utf-8');
const attributesFILES = split(raw);
extractAttributes(attributesFILES.polished, 'polished');
extractAttributes(attributesFILES.faithful, 'faithful');

export default items;
