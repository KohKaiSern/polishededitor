import addresses from '$data/addresses';

export const getAddresses = (fileHex) => {
	//Retrieve all indexes from sBackupNewBoxXEntries
	let indexes = Array(20)
		.fill()
		.map(() => Array(20).fill(null));
	for (let box = 0; box < 20; box++) {
		for (let i = 0; i < 20; i++) {
			indexes[box][i] =
				parseInt(fileHex[parseInt(addresses['sBackupNewBox1'], 16) + (33 * box + i)], 16) - 1;
		}
	}

	//Retrieve all flags from sBackupNewBoxXBanks
	let flags = Array(20)
		.fill()
		.map(() => Array(20).fill(null));
	for (let box = 0; box < 20; box++) {
		//Grab the three relevant bytes
		let flagArr = [
			fileHex[parseInt(addresses['sBackupNewBox1'], 16) + 33 * box + 20],
			fileHex[parseInt(addresses['sBackupNewBox1'], 16) + 33 * box + 21],
			fileHex[parseInt(addresses['sBackupNewBox1'], 16) + 33 * box + 22]
		];
		//Convert into binary
		flagArr = flagArr
			.map((byte) => {
				byte = parseInt(byte, 16).toString(2).padStart(8, '0').split('').reverse().join('');
				return byte;
			})
			.join('');

		//Get flag bit
		for (let i = 0; i < 20; i++) {
			flags[box][i] = flagArr[i];
		}
	}

	//Filling 20 Boxes of 20 Pokemon...
	let data = Array(20)
		.fill()
		.map(() => Array(20).fill(null));
	for (let box = 0; box < 20; box++) {
		for (let i = 0; i < 20; i++) {
			//Check if Pokemon exists
			if (indexes[box][i] === -1) {
				continue;
			}

			//If it does, find the memory block
			const block =
				(flags[box][i] === '0' ? '1' : '2') +
				(indexes[box][i] < 167 ? 'A' : indexes[box][i] < 195 ? 'B' : 'C');

			//Get address
			let address = parseInt(addresses[`sBoxMons${block}`], 16);
			if (block[1] === 'A') {
				address += indexes[box][i] * 49;
			} else if (block[1] === 'B') {
				address += (indexes[box][i] - 167) * 49;
			} else {
				address += (indexes[box][i] - 195) * 49;
			}
			data[box][i] = address;
		}
	}
	return data;
};

export default getAddresses;
