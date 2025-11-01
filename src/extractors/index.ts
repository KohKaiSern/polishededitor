import abilities from './abilities';
import { writeJSON } from './utils';

for (const [name, obj] of Object.entries({
  abilities,
})) {
  writeJSON(name, obj);
}
