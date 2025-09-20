import { readFileSync } from 'fs';
import split from './lib/split.js';
import reduce from './lib/reduce.js';

let moves = {
	polished: [],
	faithful: []
};

//Paths
const namesASM = '../../polishedcrystal/data/moves/names.asm';
const movesASM = '../../polishedcrystal/data/moves/moves.asm';

const extractNames = (data, PF) => {
	data = data.filter((line) => line.startsWith('li '));
	data = data.map((line) => line.slice(4, -1));
	for (let move of data.slice(1)) {
		moves[PF].push({
			id: reduce(move),
			name: move,
			moveNo: data.indexOf(move)
		});
	}
};

const extractMoves = (data, PF) => {
	data = data.filter((line) => line.startsWith('move '));
	data = data.map((line) => line.slice(5).split(','));
	data = data.map((move) => move.map((info) => reduce(info.trim())));
	for (let entry of data) {
		let move = moves[PF].find((move) => move.id === entry[0]);
		//TODO Special Case: Psychic
		if (entry[0] === 'psychicm') {
			move = moves[PF].find((move) => move.id === 'psychic');
		}
		if (move) {
			move.basePower = parseInt(entry[2]);
			move.type = entry[3];
			move.accuracy = parseInt(entry[4]);
			move.pp = parseInt(entry[5]);
			move.effectChance = entry[6] === '0' ? '-' : parseInt(entry[6]);
			move.category = entry[7];
		}
	}
};

//#1: Names
let raw = readFileSync(namesASM, 'utf-8');
const namesFILES = split(raw);
extractNames(namesFILES.polished, 'polished');
extractNames(namesFILES.faithful, 'faithful');

//#2: Base Power, Type, Accuracy, Power Points, Effect Chance, Damage Category
raw = readFileSync(movesASM, 'utf-8');
const movesFILES = split(raw);
extractMoves(movesFILES.polished, 'polished');
extractMoves(movesFILES.faithful, 'faithful');

export default moves;
