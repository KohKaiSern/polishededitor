import addresses from '$data/addresses.json';
import type { Player } from '$parsers/types';
import { readString, retrieve } from '$parsers/utils';

function parsePlayer(file: Uint8Array): Player {
	return {
		id: retrieve(file, addresses.wPlayerID, 2),
		name: readString(file, addresses.wPlayerName, 7, false),
		rivalName: readString(file, addresses.wRivalName, 7, false),
		money: retrieve(file, addresses.wMoney, 3),
		gender: ['Male', 'Female', 'Non-Binary'][file[addresses.wPlayerGender]]
	};
}

export default parsePlayer;
