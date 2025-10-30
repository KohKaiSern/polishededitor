import type { Move } from './types';
import { extractDescs, extractIDs, extractNames, splitRead } from './utils';

function extractAttrs(moves: Move[], ATTRS: string[]): Move[] {
	let index = 1;
	for (let lineNo = 0; lineNo < ATTRS.length; lineNo++) {
		if (!ATTRS[lineNo].startsWith('move')) continue;
		const moveProps = ATTRS[lineNo].split(',').map((p) => p.trim());
		const move = moves.find((m) => m.index === index)!;
		move.basePower = parseInt(moveProps.at(2)!);
		move.type = moveProps.at(3)!;
		move.accuracy = parseInt(moveProps.at(4)!);
		move.powerPoints = parseInt(moveProps.at(5)!);
		move.effectChance = parseInt(moveProps.at(6)!);
		move.category = moveProps.at(7)!;
		index++;
	}
	return moves;
}

const IDS = splitRead('constants/move_constants.asm');
const NAMES = splitRead('data/moves/names.asm');
const DESCS = splitRead('data/moves/descriptions.asm');
const ATTRS = splitRead('data/moves/moves.asm');

const moves: {
	polished: Move[];
	faithful: Move[];
} = {
	polished: [],
	faithful: []
};

for (const PF of ['polished', 'faithful'] as const) {
	moves[PF] = extractIDs(
		moves[PF],
		IDS[PF],
		{
			id: '',
			index: -1,
			name: '',
			description: '',
			basePower: -1,
			type: '',
			accuracy: -1,
			powerPoints: -1,
			effectChance: -1,
			category: ''
		},
		0,
		'NUM_ATTACKS'
	);
	moves[PF] = extractNames(moves[PF], NAMES[PF], 1);
	moves[PF] = extractDescs(moves[PF], DESCS[PF], 1, 'NUM_ATTACKS');
	moves[PF] = extractAttrs(moves[PF], ATTRS[PF]);
}

export default moves;
