//This is the file responsible for taking the edited save file and re-calculating & applying all the Player Data checksums.
import addresses from '$data/addresses.json';

//Details of the checksum system can be found at:
//https://bulbapedia.bulbagarden.net/wiki/Save_data_structure_(Generation_II)#Crystal
export const checksumPD = (fileHex) => {
	let sum = 0;

	// Calculate the 16-bit sum of all bytes in the backup game data region
	for (
		let address = parseInt(addresses.sBackupGameData, 16);
		address < parseInt(addresses.sBackupGameDataEnd, 16);
		address++
	) {
		sum += parseInt(fileHex[address], 16);
	}

	// Keep only the lower 16 bits
	sum = sum & 0xffff;

	// Convert to little-endian bytes
	const lowByte = (sum & 0xff).toString(16).padStart(2, '0');
	const highByte = ((sum >> 8) & 0xff).toString(16).padStart(2, '0');

	// Write checksum to both primary and backup locations
	const checksumAddr = parseInt(addresses.sChecksum, 16);
	fileHex[checksumAddr] = lowByte;
	fileHex[checksumAddr + 1] = highByte;

	const backupChecksumAddr = parseInt(addresses.sBackupChecksum, 16);
	fileHex[backupChecksumAddr] = lowByte;
	fileHex[backupChecksumAddr + 1] = highByte;

	return fileHex;
};
export default checksumPD;
