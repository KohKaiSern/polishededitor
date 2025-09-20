import { writeFileSync } from 'fs';
import addresses from './addresses.js';
import abilities from './abilities.js';
import moves from './moves.js';
import items from './items.js';
import versions from './version.js';
import growthRates from './growthRates.js';
import pokemon from './pokemon.js';

const root = '../lib/data';

writeFileSync(`${root}/addresses.json`, JSON.stringify(addresses), 'utf-8');
writeFileSync(`${root}/abilities.json`, JSON.stringify(abilities), 'utf-8');
writeFileSync(`${root}/moves.json`, JSON.stringify(moves), 'utf-8');
writeFileSync(`${root}/items.json`, JSON.stringify(items), 'utf-8');
writeFileSync(`${root}/versions.json`, JSON.stringify(versions), 'utf-8');
writeFileSync(`${root}/growthRates.json`, JSON.stringify(growthRates), 'utf-8');
writeFileSync(`${root}/pokemon.json`, JSON.stringify(pokemon), 'utf-8');
