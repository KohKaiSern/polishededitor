import addresses from '$data/addresses.json';
import reverseParseBag from '$parsers/bag/reverseParseBag';
import reverseParseBoxes from '$parsers/boxes/reverseParseBoxes';
import reverseParseParty from '$parsers/party/reverseParseParty';
import reverseParsePlayer from '$parsers/player/reverseParsePlayer';
import type { Data } from '$parsers/types';

function reverseParseSave(file: Uint8Array, data: Data, PF: 'polished' | 'faithful'): Uint8Array {
	file = reverseParseParty(file, data.party, PF);
	file = reverseParseBoxes(file, data.boxes, PF);
	file = reverseParseBag(file, data.bag, PF);
	file = reverseParsePlayer(file, data.player);
	file = checksum(file);
	return file;
}

function checksum(file: Uint8Array): Uint8Array {
	let sum = 0;
	//Calculate the 16-bit sum of all bytes in the backup game data region
	for (let address = addresses.sBackupGameData; address < addresses.sBackupGameDataEnd; address++) {
		sum += file[address];
	}
	// Keep only the lower 16 bits
	sum = sum & 0xffff;
	//Write to both checksums in little-endian format
	file.set([sum & 0xff, sum >> 8], addresses.sChecksum);
	file.set([sum & 0xff, sum >> 8], addresses.sBackupChecksum);

	return file;
}

export default reverseParseSave;
