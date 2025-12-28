import { extractDescs, extractIDs, extractNames, extractPaths } from './common';
import { applyPalette, splitRead } from './utils';
import type { ExpCandy } from './types';

function extractPNGs(expCandy: ExpCandy[], PALS: string[]): ExpCandy[] {
  const lineNo = PALS.findIndex((line) => line === 'ExpCandyIconPalette:')!;
  const color1 = PALS[lineNo + 1].match(/\d+/g)!.slice(0, 3).map(Number);
  const color2 = PALS[lineNo + 2].match(/\d+/g)!.slice(0, 3).map(Number);
  for (const candy of expCandy) {
    applyPalette(candy.spritePath, `gfx/items/${candy.id}.png`, color1, color2);
    candy.spritePath = `gfx/items/${candy.id}.png`;
  }
  return expCandy;
}

const expCandy: {
  polished: ExpCandy[];
  faithful: ExpCandy[];
} = {
  polished: [],
  faithful: []
};

const NULL_EXPCANDY: ExpCandy = {
  id: null,
  index: -1,
  name: '',
  description: '',
  spritePath: ''
};

const files = await Promise.all([
  'constants/item_constants.asm',
  'data/items/exp_candy_names.asm',
  'data/items/descriptions.asm',
  'data/items/icon_pointers.asm',
  'gfx/items.asm',
  'engine/gfx/color.asm'
].map(path => splitRead(path)))

for (const PF of ['polished', 'faithful'] as const) {
  expCandy[PF] = extractIDs(expCandy[PF], files[0][PF], NULL_EXPCANDY, 'NUM_WINGS', 'NUM_CANDIES');
  expCandy[PF] = extractNames(expCandy[PF], files[1][PF], 1);
  expCandy[PF] = extractDescs(expCandy[PF], files[2][PF], 1, 'NUM_KEY_ITEMS', 'NUM_CANDIES');
  expCandy[PF] = extractPaths(expCandy[PF], files[3][PF], files[4][PF], 0, 'NUM_KEY_ITEMS', 'NUM_CANDIES');
  expCandy[PF] = extractPNGs(expCandy[PF], files[5][PF]);
}

export default expCandy;
