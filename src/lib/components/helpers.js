//A collection of small helper functions

const TYPE_COLOURS = {
	bug: '#92BC2C',
	dark: '#595761',
	dragon: '#0C69C8',
	electric: '#F2D94E',
	fire: '#FBA54C',
	fairy: '#EE90E6',
	fighting: '#D3425F',
	flying: '#A1BBEC',
	ghost: '#5F6DBC',
	grass: '#5FBD58',
	ground: '#DA7C4D',
	ice: '#75D0C1',
	normal: '#A0A29F',
	poison: '#B763CF',
	psychic: '#FA8581',
	rock: '#C9BB8A',
	steel: '#5695A3',
	water: '#539DDF'
};

export const getTypeColour = (type) => {
	return TYPE_COLOURS[type];
};

const NATURES = [
	{ value: 'Hardy', name: 'Hardy' },
	{ value: 'Lonely', name: 'Lonely +Atk -Def' },
	{ value: 'Adamant', name: 'Adamant +Atk -Sat' },
	{ value: 'Naughty', name: 'Naughty +Atk -Sde' },
	{ value: 'Brave', name: 'Brave +Atk -Spe' },
	{ value: 'Bold', name: 'Bold +Def -Atk' },
	{ value: 'Docile', name: 'Docile' },
	{ value: 'Impish', name: 'Impish +Def -Sat' },
	{ value: 'Lax', name: 'Lax +Def -Sde' },
	{ value: 'Relaxed', name: 'Relaxed +Def -Spe' },
	{ value: 'Modest', name: 'Modest +Sat -Atk' },
	{ value: 'Mild', name: 'Mild +Sat -Def' },
	{ value: 'Bashful', name: 'Bashful' },
	{ value: 'Rash', name: 'Rash +Sat -Sde' },
	{ value: 'Quiet', name: 'Quiet +Sat -Spe' },
	{ value: 'Calm', name: 'Calm +Sde -Atk' },
	{ value: 'Gentle', name: 'Gentle +Sde -Def' },
	{ value: 'Careful', name: 'Careful +Sde -Sat' },
	{ value: 'Quirky', name: 'Quirky' },
	{ value: 'Sassy', name: 'Sassy +Sde -Spe' },
	{ value: 'Timid', name: 'Timid +Spe -Atk' },
	{ value: 'Hasty', name: 'Hasty +Spe -Def' },
	{ value: 'Jolly', name: 'Jolly +Spe -Sat' },
	{ value: 'Naive', name: 'Naive +Spe -Sde' },
	{ value: 'Serious', name: 'Serious' }
];

export const getNature = (x) => {
	return NATURES[x].value;
};

//The opposite of the above
export const getNatureNo = (nature) => {
	return NATURES.findIndex((NATURE) => NATURE.value === nature);
};

//Just get a list
export const getNatures = () => {
	return NATURES;
};

export const cammyFormat = (str) => {
	if (str === 'spiky_eared') {
		return 'spiky';
	}
	return str
		.toLowerCase()
		.replaceAll(' ', '_')
		.replaceAll('-', '_')
		.replaceAll("'", '_')
		.replaceAll('.', '_')
		.replaceAll('♂', 'm')
		.replaceAll('♀', 'f')
		.replaceAll('é', 'e');
};

//Converts save file to string of two-digit hex numbers
export const buf2hex = (buffer) => {
	return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, '0').toUpperCase());
};

//The opposite of the above
export const hex2buf = (hex) => {
	const bytes = new Uint8Array(hex.map((byte) => parseInt(byte, 16)));
	return bytes.buffer;
};

//Converts hex byte string to string of 8 bits
export const hex2bin = (hex) => {
	return parseInt(hex, 16).toString(2).padStart(8, '0');
};

//The opposite of the above
export const bin2hex = (bin) => {
	return parseInt(bin, 2).toString(16).padStart(2, '0');
};

export const reduce = (str) => {
	return str
		.toLowerCase()
		.replaceAll(' ', '')
		.replaceAll('_', '')
		.replaceAll('-', '')
		.replaceAll("'", '')
		.replaceAll('.', '')
		.replaceAll('♂', 'm')
		.replaceAll('♀', 'f')
		.replaceAll('é', 'e');
};
