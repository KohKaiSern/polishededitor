import abilities from './abilities';
import charmap from './charmap'
import locations from './locations';
import moves from './moves';
import { writeJSON } from './utils';

for (const [name, obj] of Object.entries({
  abilities,
  charmap,
  locations,
  moves
})) {
  writeJSON(name, obj);
}
