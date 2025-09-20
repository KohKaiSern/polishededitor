import { writeFileSync } from 'fs';
import addresses from './addresses.js';
import abilities from './abilities.js';
import moves from './moves.js';
import items from './items.js';
import versions from './version.js';
import growthRates from './growth.js';

writeFileSync('../lib/data/addresses.json', JSON.stringify(addresses), 'utf-8');
writeFileSync('../lib/data/abilities.json', JSON.stringify(abilities), 'utf-8');
writeFileSync('../lib/data/moves.json', JSON.stringify(moves), 'utf-8');
writeFileSync('../lib/data/items.json', JSON.stringify(items), 'utf-8');
writeFileSync('../lib/data/versions.json', JSON.stringify(versions), 'utf-8');
writeFileSync('../lib/data/growthRates.json', JSON.stringify(growthRates), 'utf-8');
