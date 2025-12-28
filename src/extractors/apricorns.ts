import { extractIDs, extractNames, extractPNGs } from './common';
import { splitRead } from './utils';
import type { Apricorn, Item } from './types';
import items from './items';

function extractBalls(apricorns: Apricorn[], BALLS: string[], items: Item[]): Apricorn[] {
  let index = 1;
  for (let lineNo = 0; lineNo < BALLS.length; lineNo++) {
    if (!BALLS[lineNo].includes('checkevent EVENT_GAVE_KURT')) continue;
    const pointer = BALLS[lineNo + 1].split(' ').at(1)! + ':';
    let ballIndex = BALLS.findIndex((line) => line.includes(pointer))!;
    while (!BALLS[ballIndex].includes('verbosegiveitemvar')) ballIndex++;
    const ball = BALLS[ballIndex].match(/([A-Z_]+),/)!.at(1)!;
    const apricorn = apricorns.find((a) => a.index === index);
    if (apricorn) {
      apricorn.ball = items.find((i) => i.id === ball)!.name;
    }
    index++;
  }
  return apricorns;
}

const apricorns: {
  polished: Apricorn[];
  faithful: Apricorn[];
} = {
  polished: [],
  faithful: []
};

const NULL_APRICORN: Apricorn = {
  id: null,
  index: -1,
  name: '',
  ball: '',
  spritePath: 'gfx/items/apricorn.png'
};

const files = await Promise.all([
  'constants/item_constants.asm',
  'data/items/apricorn_names.asm',
  'maps/KurtsHouse.asm',
  'gfx/items/apricorns.pal'
].map(path => splitRead(path)))

for (const PF of ['polished', 'faithful'] as const) {
  apricorns[PF] = extractIDs(
    apricorns[PF],
    files[0][PF],
    NULL_APRICORN,
    'const_value - 1 == NUM_ITEMS',
    'NUM_APRICORNS'
  );
  apricorns[PF] = extractNames(apricorns[PF], files[1][PF], 1);
  apricorns[PF] = extractBalls(apricorns[PF], files[2][PF], items[PF]);
  apricorns[PF] = extractPNGs(apricorns[PF], files[3][PF], 1);
}

export default apricorns;
