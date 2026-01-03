import addresses from '$data/addresses.json';
import { reverseParsePartyMon } from '$parsers/mon/reverseParseMon';
import type { PartyMon } from '$parsers/types';
import { writeString } from '$parsers/utils';

function reverseParseParty(
	file: Uint8Array,
	party: PartyMon[],
	PF: 'polished' | 'faithful'
): Uint8Array {
	file[addresses.sBackupPokémonData] = party.length;
	for (let i = 0; i < party.length; i++) {
		file = reverseParsePartyMon(file, addresses.sBackupPokémonData + 8 + 48 * i, party[i], PF);
		file = writeString(file, addresses.wPartyMonOTs + i * 11, 8, party[i].OTNickname, false);
		file[addresses.wPartyMon1HyperTraining + i * 11] =
			party[i].hyperTraining.map((s) => Number(s)).reduce((a, b) => (a << 1) | b) << 2;
		file = writeString(file, addresses.wPartyMon1Nickname + i * 11, 11, party[i].nickname, false);
	}
	return file;
}

export default reverseParseParty;
