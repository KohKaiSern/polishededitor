import { writeFileSync } from 'fs';
import addresses from './addresses.js';
import abilities from './abilities.js';
import moves from './moves.js';

writeFileSync('../lib/data/addresses.json', JSON.stringify(addresses), 'utf-8');
writeFileSync('../lib/data/abilities.json', JSON.stringify(abilities), 'utf-8');
writeFileSync('../lib/data/moves.json', JSON.stringify(moves), 'utf-8');
