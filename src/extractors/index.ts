import abilities from './abilities';
import addresses from './addresses';
import badges from './badges';
import boxThemes from './boxThemes';
import charmap from './charmap';
import growthRateCoefficients from './growthRateCoefficients';
import items from './items';
import keyItems from './keyItems';
import locations from './locations';
import moves from './moves';
import pokemon from './pokemon';
import { writeJSON } from './utils';
import versions from './versions';

for (const [name, obj] of Object.entries({
	addresses,
	locations,
	abilities,
	items,
	keyItems,
	moves,
	boxThemes,
	growthRateCoefficients,
	versions,
	badges,
	charmap,
	pokemon
})) {
	writeJSON(name, obj);
}
