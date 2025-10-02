<script>
	import { Label, Input, Heading, Button, ButtonGroup } from 'flowbite-svelte';
	import DropdownSearch from '$components/DropdownSearch.svelte';
	import { PlusOutline, MinusOutline } from 'flowbite-svelte-icons';
	import { getNatures } from '$components/helpers';
	import { increment, decrement, enforce } from './numberInputHelpers';
	import NatureTable from './NatureTable.svelte';
	let { mon = $bindable() } = $props();
</script>

<Heading tag="h6">Determinant Values</Heading>
<div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
	{#each ['HP', 'Atk', 'Def', 'Speed', 'Sp. Def', 'Sp. Atk'] as stat, i}
		<div>
			<Label class="mb-2 text-sm">{stat}</Label>
			<ButtonGroup>
				<Button
					type="button"
					onclick={() => (mon.dvs[i] = decrement(mon.dvs[i], 0, 15))}
					class="p-2!"
				>
					<MinusOutline class="size-6" />
				</Button>
				<Input
					bind:value={mon.dvs[i]}
					type="number"
					onfocusout={() => (mon.dvs[i] = enforce(mon.dvs[i], 0, 15))}
					class="w-15 [appearance:textfield] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
				/>
				<Button
					type="button"
					onclick={() => (mon.dvs[i] = increment(mon.dvs[i], 0, 15))}
					class="p-2!"
				>
					<PlusOutline class="size-6" />
				</Button>
			</ButtonGroup>
		</div>
	{/each}
</div>

<Heading tag="h6" class="mt-5">Effort Values</Heading>
<div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
	{#each ['HP', 'Atk', 'Def', 'Speed', 'Sp. Def', 'Sp. Atk'] as stat, i}
		<div>
			<Label class="mb-2 text-sm">{stat}</Label>
			<ButtonGroup>
				<Button
					type="button"
					onclick={() => (mon.evs[i] = decrement(mon.evs[i], 0, 252))}
					class="p-2!"
				>
					<MinusOutline class="size-6" />
				</Button>
				<Input
					bind:value={mon.evs[i]}
					type="number"
					onfocusout={() => (mon.evs[i] = enforce(mon.evs[i], 0, 252))}
					class="w-15 [appearance:textfield] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
				/>
				<Button
					type="button"
					onclick={() => (mon.evs[i] = increment(mon.evs[i], 0, 252))}
					class="p-2!"
				>
					<PlusOutline class="size-6" />
				</Button>
			</ButtonGroup>
		</div>
	{/each}
</div>

<Heading tag="h6" class="mt-5 mb-3">Nature</Heading>
<DropdownSearch bind:value={mon.nature} options={getNatures().map((x) => x.value)} />
<div class="mt-5">
	<NatureTable />
</div>
