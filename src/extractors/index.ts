import abilities from './abilities';
import locations from './locations';
import { writeJSON } from './utils';

for (const [name, obj] of Object.entries({
  abilities,
  locations
})) {
  writeJSON(name, obj);
}
