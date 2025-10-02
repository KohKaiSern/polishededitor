<script>
	import { Heading, Accordion, AccordionItem } from 'flowbite-svelte';
	import DVEVNature from './monEditors/DVEVNature.svelte';
	import Misc from './monEditors/Misc.svelte';
	import Moveset from './monEditors/Moveset.svelte';
	import Basics from './monEditors/Basics.svelte';
	let { mon = $bindable(), PF } = $props();
</script>

<Heading tag="h3">Edit {mon.species}</Heading>

<Accordion class="mt-4">
	<AccordionItem open>
		{#snippet header()}Basics{/snippet}
		<Basics bind:mon {PF} />
	</AccordionItem>
	<AccordionItem>
		{#snippet header()}DVs, EVs & Nature{/snippet}
		<DVEVNature bind:mon />
	</AccordionItem>
	<AccordionItem>
		{#snippet header()}Moveset{/snippet}
		<Moveset bind:mon {PF} />
	</AccordionItem>
	<AccordionItem>
		{#snippet header()}Miscellaneous{/snippet}
		<Misc bind:mon {PF} />
	</AccordionItem>
</Accordion>
