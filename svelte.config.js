import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$data: 'src/data',
			$extractors: 'src/extractors',
			$parsers: 'src/parsers',
			$ui: 'src/lib/components/ui',
			$components: 'src/lib/components'
		}
	}
};

export default config;
