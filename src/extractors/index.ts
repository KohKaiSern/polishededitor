import items from './items';
import { writeJSON } from './utils';

for (const [name, obj] of Object.entries({
	items
})) {
	writeJSON(name, obj);
}
