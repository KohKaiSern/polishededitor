<script>
	import { Heading, Accordion, AccordionItem } from 'flowbite-svelte';
	import { Basics, DVEVNature, Moveset, Misc } from '$components/monEditors';
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
		<Misc bind:mon />
	</AccordionItem>
</Accordion>
