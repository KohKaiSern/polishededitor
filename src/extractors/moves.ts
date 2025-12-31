import { extractDescs, extractIDs, extractNames } from './common';
import type { Move } from './types';
import { splitRead } from './utils';

function extractAttrs(moves: Move[], ATTRS: string[]): Move[] {
	let index = 1;
	for (let lineNo = 0; lineNo < ATTRS.length; lineNo++) {
		if (!ATTRS[lineNo].startsWith('move')) continue;
		const attributes = ATTRS[lineNo]
			.split(',')
			.map((a) => a.trim())
			.slice(2);
		const move = moves.find((m) => m.index === index)!;
		move.basePower = parseInt(attributes.at(0)!);
		move.type = attributes.at(1)!;
		move.accuracy = parseInt(attributes.at(2)!);
		move.powerPoints = parseInt(attributes.at(3)!);
		move.effectChance = parseInt(attributes.at(4)!);
		move.category = attributes.at(5)!;
		index++;
	}
	return moves;
}

const moves: {
	polished: Move[];
	faithful: Move[];
} = {
	polished: [],
	faithful: []
};

const NULL_MOVE: Move = {
	id: null,
	index: -1,
	name: '',
	description: '',
	basePower: -1,
	type: '',
	accuracy: -1,
	powerPoints: -1,
	effectChance: -1,
	category: ''
};

const files = await Promise.all(
	[
		'constants/move_constants.asm',
		'data/moves/names.asm',
		'data/moves/descriptions.asm',
		'data/moves/moves.asm'
	].map((path) => splitRead(path))
);

for (const PF of ['polished', 'faithful'] as const) {
	moves[PF] = extractIDs(moves[PF], files[0][PF], NULL_MOVE, undefined, 'NUM_ATTACKS');
	moves[PF] = extractNames(moves[PF], files[1][PF], 1);
	moves[PF] = extractDescs(moves[PF], files[2][PF], 1);
	moves[PF] = extractAttrs(moves[PF], files[3][PF]);
}

export default moves;
