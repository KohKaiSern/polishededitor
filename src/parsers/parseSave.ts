import parseBag from '$parsers/bag/parseBag';
import parseBoxes from '$parsers/boxes/parseBoxes';
import parseParty from '$parsers/party/parseParty';
import parsePlayer from '$parsers/player/parsePlayer';
import parsePokedex from '$parsers/pokedex/parsePokedex';
import type { Data } from '$parsers/types';

function parseSave(file: Uint8Array, PF: 'polished' | 'faithful'): Data {
	return {
		party: parseParty(file, PF),
		boxes: parseBoxes(file, PF),
		bag: parseBag(file, PF),
		player: parsePlayer(file),
		pokedex: parsePokedex(file, PF)
	};
}

export default parseSave;
