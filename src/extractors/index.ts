import abilities from './abilities';
import items from './items';
import moves from './moves';
import pokemon from './pokemon';
import { writeJSON } from './utils';

for (const [name, obj] of Object.entries({
  items,
  abilities,
  moves,
  pokemon
})) {
  writeJSON(name, obj);
}
