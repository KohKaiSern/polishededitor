<script>
	import { Label, Heading } from 'flowbite-svelte';
	import { DropdownSearch, NumberInput } from '$components/UI';
	import { getNatures } from '$components/helpers';
	import NatureTable from './NatureTable.svelte';
	let { mon = $bindable() } = $props();
</script>

<Heading tag="h6">Determinant Values</Heading>
<div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
	{#each ['HP', 'Atk', 'Def', 'Speed', 'Sp. Def', 'Sp. Atk'] as stat, i}
		<div>
			<Label class="mb-2 text-sm">{stat}</Label>
			<NumberInput bind:value={mon.dvs[i]} min={0} max={15} />
		</div>
	{/each}
</div>

<Heading tag="h6" class="mt-5">Effort Values</Heading>
<div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
	{#each ['HP', 'Atk', 'Def', 'Speed', 'Sp. Def', 'Sp. Atk'] as stat, i}
		<div>
			<Label class="mb-2 text-sm">{stat}</Label>
			<NumberInput bind:value={mon.evs[i]} min={0} max={252} />
		</div>
	{/each}
</div>

<Heading tag="h6" class="mb-3 mt-5">Nature</Heading>
<DropdownSearch bind:value={mon.nature} options={getNatures().map((x) => x.value)} />
<div class="mt-5">
	<NatureTable />
</div>
