import items from './items';
import abilities from './abilities';
import { writeJSON } from './utils';

for (const [name, obj] of Object.entries({
  items,
  abilities
})) {
  writeJSON(name, obj);
}
