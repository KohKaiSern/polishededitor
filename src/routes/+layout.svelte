<script>
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import SaveHandler from '$components/SaveHandler.svelte';
	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SaveHandler />

{@render children?.()}
