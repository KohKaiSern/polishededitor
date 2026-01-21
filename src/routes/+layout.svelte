<script lang="ts">
	import { dev } from '$app/environment';
	import './layout.css';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	let { children } = $props();
	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<title>Polished Editor - Cheating/Save Editing Tool for Polished Crystal</title>
	<meta
		name="description"
		content="Cheating tool for Polished Crystal that works by editing your save file via an intuitive UI. Edit Pokemon Stats, Nicknames, Bag Contents, Pokedex Data, and more!"
	/>
</svelte:head>

{@render children()}
