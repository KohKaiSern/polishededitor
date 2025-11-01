import { splitRead } from "./utils";

const CHARMAP = splitRead('constants/charmap.asm').polished

const charmap: Record<string, string> = {}

let lineNo = 0;
while (!CHARMAP[lineNo].includes('FIRST_REGULAR_TEXT_CHAR')) lineNo++;
for (; lineNo < CHARMAP.length; lineNo++) {
  if (CHARMAP[lineNo].includes('NGRAMS_START')) break;
  if (!CHARMAP[lineNo].includes('"')) continue;
  const match = CHARMAP[lineNo].match(/"(.+)".+\$(..)/)!
  charmap[match.at(2)!.toUpperCase()] = match.at(1)!
}

export default charmap
