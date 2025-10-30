import abilities from './abilities';
import items from './items';
import moves from './moves';
import { writeJSON } from './utils';

for (const [name, obj] of Object.entries({
	items,
	abilities,
	moves
})) {
	writeJSON(name, obj);
}
