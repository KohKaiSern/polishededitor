import { extractDescs, extractIDs, extractNames, extractPNGs, extractPaths } from './common';
import { splitRead } from './utils';
import type { Item } from './types';

function extractAttrs(items: Item[], ATTRS: string[]): Item[] {
  let index = 1;
  for (let lineNo = 0; lineNo < ATTRS.length; lineNo++) {
    if (ATTRS[lineNo].includes('NUM_ITEMS')) break;
    if (!ATTRS[lineNo].startsWith('item_attribute')) continue;
    items.find((i) => i.index === index)!.category = ATTRS[lineNo].split(',').at(3)!.slice(1);
    index++;
  }
  return items;
}

const items: {
  polished: Item[];
  faithful: Item[];
} = {
  polished: [],
  faithful: []
};

const NULL_ITEM: Item = {
  id: null,
  index: -1,
  name: '',
  description: '',
  category: '',
  spritePath: ''
};

const files = await Promise.all([
  'constants/item_constants.asm',
  'data/items/names.asm',
  'data/items/descriptions.asm',
  'data/items/attributes.asm',
  'data/items/icon_pointers.asm',
  'gfx/items.asm',
  'gfx/items/items.pal'
].map(path => splitRead(path)))

for (const PF of ['polished', 'faithful'] as const) {
  items[PF] = extractIDs(items[PF], files[0][PF], NULL_ITEM, undefined, 'NUM_ITEMS');
  items[PF] = extractNames(items[PF], files[1][PF], 0);
  items[PF] = extractDescs(items[PF], files[2][PF], 1, undefined, 'NUM_ITEMS');
  items[PF] = extractAttrs(items[PF], files[3][PF]);
  items[PF] = extractPaths(items[PF], files[4][PF], files[5][PF], 0, undefined, 'NUM_ITEMS');
  //Special Case: Park Ball
  items[PF][0].id = 'PARK_BALL';
  items[PF][0].spritePath = 'gfx/items/park_ball.png';
  items[PF] = extractPNGs(items[PF], files[6][PF], 0);
}

export default items;
