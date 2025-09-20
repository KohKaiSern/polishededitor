import { readFileSync, readdirSync } from 'fs';

let versions = {};

//Paths
const versionDIR = '../../';
const saveASM = '../../polishedcrystal/constants/misc_constants.asm';

const extractGameVersion = (dir) => {
	for (let filename of dir) {
		if (filename.endsWith('.sym')) {
			versions.game = filename.slice(16, -4);
		}
	}
};

const extractSaveVersion = (data) => {
	data = data.split('\n');
	data = data.map((line) => line.trim());
	let saveVersion = data.find((line) => line.includes('SAVE_VERSION'));
	versions.save = parseInt(saveVersion.split(' ').at(-1));
};

//#1: Game Version
let raw = readdirSync(versionDIR, 'utf-8');
extractGameVersion(raw);

//#2 Save Version
raw = readFileSync(saveASM, 'utf-8');
extractSaveVersion(raw);

export default versions;
