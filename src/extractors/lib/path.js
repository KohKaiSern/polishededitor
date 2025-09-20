/*
Vercel doesn't play nice with import.meta.dirname,
so this function acts as a workaround.
*/
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const path = (route) => {
	return join(__dirname, '../../../polishedcrystal', route);
};

export default path;
