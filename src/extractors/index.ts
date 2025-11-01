import abilities from './abilities';
import charmap from './charmap'
import locations from './locations';
import { writeJSON } from './utils';

for (const [name, obj] of Object.entries({
  abilities,
  charmap,
  locations
})) {
  writeJSON(name, obj);
}
