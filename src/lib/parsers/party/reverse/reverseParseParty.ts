import addresses from '$data/addresses.json';
import checksumPlayer from '$lib/parsers/checksumPlayer';
import { bin2hex, writeString } from '$lib/utils';
import type { PartyMon } from '$lib/types';
import reverseParsePartyMon from './reverseParsePartyMon';

function reverseParseParty(
  fileHex: string[],
  party: PartyMon[],
  PF: 'polished' | 'faithful'
): string[] {
  const address = addresses.sPokémonData + 8;
  fileHex[address - 8] = party.filter(Boolean).length.toString(16).padStart(2, '0');
  for (let i = 0; i < 6; i++) {
    if (!party[i]) continue;
    fileHex = reverseParsePartyMon(fileHex, address + 48 * i, party[i], PF);
    fileHex = writeString(fileHex, address + 288 + i * 11, 8, party[i].OTNickname, false);
    fileHex[address + 307 + i * 11] = bin2hex(
      party[i].hyperTraining.map((stat) => (stat ? '1' : '0')).join('')
    );
    fileHex = writeString(fileHex, address + 354 + i * 11, 11, party[i].nickname, false);
  }
  return fileHex;
}
export default reverseParseParty;
