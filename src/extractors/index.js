import { writeFileSync } from 'fs';
import path from './lib/path.js';
import addresses from './addresses.js';

writeFileSync('../lib/data/addresses.json', JSON.stringify(addresses), 'utf-8');
