import { splitRead } from './utils';

function extractCharmap(CHARMAP: string[]): Record<string, string> {
  const charmap: Record<string, string> = {};
  let lineNo = 0;
  while (!CHARMAP[lineNo].includes('FIRST_REGULAR_TEXT_CHAR')) lineNo++;
  for (; lineNo < CHARMAP.length; lineNo++) {
    if (!CHARMAP[lineNo].includes('"')) continue;
    const char = CHARMAP[lineNo].split('"').at(1)!;
    charmap[CHARMAP[lineNo].split('$').at(1)!.slice(0, 2).toUpperCase()] = char;
  }
  return charmap;
}

const CHARMAP = await splitRead('constants/charmap.asm');
const charmap = extractCharmap(CHARMAP.polished);
export default charmap;
