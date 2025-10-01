//This is the file responsible for parsing the mon objects into a new save file.
import reverseParseMon from './reverseParseMon.js';
import getAddresses from './getAddresses.js';

//Determines the memory address of each Pokemon and calls the reverse parse function on it.

export const reverseParseSave = (fileHex, mons, PF) => {
	//Get 20x20 Array of Addresses
	const addresses = getAddresses(fileHex);
	//Loop through every address and edit the save
	for (let i = 0; i < 20; i++) {
		for (let j = 0; j < 20; j++) {
			if (mons[i][j] === null) {
				continue;
			}
			fileHex = reverseParseMon(fileHex, addresses[i][j], mons[i][j], PF);
		}
	}
	return fileHex;
};

export default reverseParseSave;
