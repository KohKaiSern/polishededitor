import { readFileSync } from 'fs';
let addresses = {};

//Path
const addressesASM = '../../polishedcrystal-3.1.1.sym';

//Symbols
const SYMBOLS = [
	'sSaveVersion',
	'sBackupNewBox1',
	'sBoxMons1A',
	'sBoxMons1B',
	'sBoxMons1C',
	'sBoxMons2A',
	'sBoxMons2B',
	'sBoxMons2C'
];

//Converts wRAM address to sRAM
const wToSRAM = (address) => {
	//M = (0x2000 * PP) + (QQQQ - 0xA000), where the original memory address was PP:QQQQ
	return (8192 * parseInt(address.slice(0, 2), 16) + (parseInt(address.slice(2), 16) - 40960))
		.toString(16)
		.padStart(4, '0');
};

const extractAddresses = (data) => {
	data = data.split('\n');
	data = data.map((line) => line.trim());
	for (let entry of SYMBOLS) {
		const symbol = data.find((line) => line.endsWith(entry));
		addresses[entry] = wToSRAM(symbol.split(' ').at(0).replace(':', ''));
	}
};

//#1: Addresses
const raw = readFileSync(addressesASM, 'utf-8');
extractAddresses(raw);

export default addresses;
