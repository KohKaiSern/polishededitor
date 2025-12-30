<script lang="ts">
	import { Label, Heading, P, ButtonGroup, Button } from 'flowbite-svelte';
	import NumberInput from '$ui/number-input.svelte';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import TypeIcon from '$ui/type-icon.svelte';

	interface StatsProps {
		mon: PartyMon | BoxMon;
		PF: 'polished' | 'faithful';
	}

	let { mon = $bindable(), PF }: StatsProps = $props();

	let hiddenPowerType = $derived.by(() => {
		const types = [
			'FIGHTING',
			'FLYING',
			'POISON',
			'GROUND',
			'ROCK',
			'BUG',
			'GHOST',
			'STEEL',
			'FIRE',
			'WATER',
			'GRASS',
			'ELECTRIC',
			'PSYCHIC',
			'ICE',
			'DRAGON',
			'DARK',
			'FAIRY'
		];
		let x = 0;
		for (let i = 0; i < 6; i++) {
			x += (mon.dvs[i] % 2) * 2 ** i;
		}
		if (PF === 'polished') {
			return types[Math.floor((x * 16) / 63)];
		}
		return types[Math.floor((x * 15) / 63)];
	});
</script>

<Heading tag="h5">Determinant Values</Heading>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
	{#each mon.dvs as _, i}
		<div>
			<Label class="mb-[-10px]">{['HP', 'Atk', 'Def', 'Speed', 'Sp. Atk', 'Sp. Def'][i]}</Label>
			<NumberInput bind:value={mon.dvs[i]} min={0} max={15} />
		</div>
	{/each}
</div>

<div class="flex items-center mt-5 gap-2">
	<P>Hidden Power</P>
	<TypeIcon type={hiddenPowerType} />
</div>

<Heading tag="h5" class="my-5">Effort Values</Heading>
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
	{#each mon.evs as _, i}
		<div>
			<Label class="mb-[-10px]">{['HP', 'Atk', 'Def', 'Speed', 'Sp. Atk', 'Sp. Def'][i]}</Label>
			<NumberInput bind:value={mon.evs[i]} min={0} max={255} />
		</div>
	{/each}
</div>

<Heading tag="h5" class="mb-5">Hyper Training</Heading>

<ButtonGroup class="hidden sm:flex border-0 ring-0 shadow-none">
	{#each ['HP', 'Atk', 'Def', 'Speed', 'Sp. Atk', 'Sp. Def'] as stat, i}
		<Button
			onclick={() => (mon.hyperTraining[i] = !mon.hyperTraining[i])}
			class={mon.hyperTraining[i]
				? 'bg-purple-600 text-white ring-0 border-1 outline-0 border-white dark:bg-purple-500 dark:text-white'
				: 'ring-0 border-1 outline-0 border-gray-300'}
		>
			{stat}
		</Button>
	{/each}
</ButtonGroup>

<div class="flex flex-col gap-2 sm:hidden">
	<ButtonGroup class="flex w-full">
		{#each ['HP', 'Atk', 'Def'] as stat, i}
			<Button
				onclick={() => (mon.hyperTraining[i] = !mon.hyperTraining[i])}
				class="{mon.hyperTraining[i]
					? 'bg-purple-600 text-white ring-0 border-1 outline-0 border-white dark:bg-purple-500 dark:text-white'
					: 'ring-0 border-1 outline-0 border-gray-300'} flex-1"
			>
				{stat}
			</Button>
		{/each}
	</ButtonGroup>
	<ButtonGroup class="flex w-full">
		{#each ['Speed', 'Sp. Atk', 'Sp. Def'] as stat, i}
			<Button
				onclick={() => (mon.hyperTraining[i + 3] = !mon.hyperTraining[i + 3])}
				class="{mon.hyperTraining[i + 3]
					? 'bg-purple-600 text-white ring-0 border-1 outline-0 border-white dark:bg-purple-500 dark:text-white'
					: 'ring-0 border-1 outline-0 border-gray-300'} flex-1"
			>
				{stat}
			</Button>
		{/each}
	</ButtonGroup>
</div>
