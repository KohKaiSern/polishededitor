<script>
	import { Heading, Accordion, AccordionItem } from 'flowbite-svelte';
	import DVEVNature from './monEditors/DVEVNature.svelte';
	let { mon = $bindable(), PF } = $props();
</script>

<Heading tag="h3">Edit {mon.species}</Heading>

<Accordion class="mt-4">
	<AccordionItem open>
		{#snippet header()}Basics{/snippet}
		Test
	</AccordionItem>
	<AccordionItem>
		{#snippet header()}DVs, EVs & Nature{/snippet}
		<DVEVNature bind:mon />
	</AccordionItem>
	<AccordionItem>
		{#snippet header()}Moveset{/snippet}
		Test
	</AccordionItem>
	<AccordionItem>
		{#snippet header()}Miscellaneous{/snippet}
		Test
	</AccordionItem>
</Accordion>
