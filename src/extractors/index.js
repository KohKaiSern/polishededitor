import { writeFileSync } from 'fs';
import addresses from './addresses.js';

writeFileSync('../lib/data/addresses.json', JSON.stringify(addresses), 'utf-8');
