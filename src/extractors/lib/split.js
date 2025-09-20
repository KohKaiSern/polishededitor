//This function takes a file as input and returns:
//An Array with two entries
//Entry #0 is the Polished file, split into lines
//Entry #1 is the Faithful file, split into lines
//Incidentally, it also:
//#1. Replaces all # with Poké
//#2. Replaces all Poke with Poké
//#3. Removes all @

export const split = (file) => {
	let files = {
		polished: [],
		faithful: []
	};
	let data = file
		.trim()
		.split('\n')
		.map((line) =>
			line.trim().replaceAll('#', 'Poké').replaceAll('Poke', 'Poké').replaceAll('@', '')
		);

	for (let lineNo = 0; lineNo < data.length; lineNo++) {
		//Polished/Faithful Split
		if (
			data[lineNo].toLowerCase().startsWith('if ') &&
			data[lineNo].toLowerCase().includes('faithful')
		) {
			//Jump to the next line
			lineNo++;

			//Then keep adding the faithful lines until we hit the else condition
			while (data[lineNo] != 'else') {
				files.faithful.push(data[lineNo]);
				lineNo++;
			}

			//Once we hit the else condition, jump to the next line
			lineNo++;

			//Then keep adding the polished lines until we hit the endc condition
			while (data[lineNo] != 'endc') {
				files.polished.push(data[lineNo]);
				lineNo++;
			}
		} else {
			files.polished.push(data[lineNo]);
			files.faithful.push(data[lineNo]);
		}
	}
	return files;
};

export default split;
