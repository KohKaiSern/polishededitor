<script>
	import { Label, Input, Heading, Button, ButtonGroup, Select } from 'flowbite-svelte';
	import { PlusOutline, MinusOutline } from 'flowbite-svelte-icons';
	import { getNatures } from '$components/helpers';
	let { mon = $bindable() } = $props();

	const increment = (x, min, max) => (x === max ? min : x + 1);
	const decrement = (x, min, max) => (x === min ? max : x - 1);
	const enforce = (x, min, max) => {
		if (typeof x != 'number') return max;
		if (!Number.isInteger(x)) return max;
		if (x < min || x > max) return max;
		return x;
	};
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
<Select items={getNatures()} bind:value={mon.nature} />
