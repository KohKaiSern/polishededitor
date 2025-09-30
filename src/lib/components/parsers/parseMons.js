import getAddresses from './getAddresses.js';
import parseMon from './parseMon.js';

export const parseMons = (fileHex, PF) => {
	// #1: Obtain a 20x20 Array of Pointers for the Pokemon.
	// #2: Run the parseMon function for each Pokemon.
	const monPointers = getAddresses(fileHex);
	const mons = Array(20)
		.fill()
		.map(() => Array(20).fill(null));
	//Loop through every address and return a Pokemon object.
	for (let i = 0; i < 20; i++) {
		for (let j = 0; j < 20; j++) {
			if (monPointers[i][j] === null) {
				continue;
			}
			mons[i][j] = parseMon(fileHex, monPointers[i][j], PF);
		}
	}
	return mons;
};

export default parseMons;
