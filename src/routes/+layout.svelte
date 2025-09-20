<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import SaveHandler from '$components/SaveHandler.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SaveHandler />

{@render children?.()}
