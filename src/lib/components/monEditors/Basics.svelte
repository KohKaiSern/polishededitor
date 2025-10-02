<script>
	import { Heading, Input, ButtonGroup, Button } from 'flowbite-svelte';
	import { PlusOutline, MinusOutline } from 'flowbite-svelte-icons';
	import items from '$data/items.json';
	import pokemon from '$data/pokemon.json';
	import growthRates from '$data/growthRates.json';
	import DropdownSearch from '$components/DropdownSearch.svelte';
	import { increment, decrement, enforce } from './numberInputHelpers';
	let { mon = $bindable(), PF } = $props();

	const setExpForLvl = () => {
		//Formula: [1]/[2]*n**3 + [3]*n**2 + [4]*n - [5]
		const growthCFs = growthRates[getGrowthRate()];
		mon.exp = Math.ceil(
			(growthCFs[0] / growthCFs[1]) * mon.level ** 3 +
				growthCFs[2] * mon.level ** 2 +
				growthCFs[3] * mon.level -
				growthCFs[4]
		);
	};
	const getGrowthRate = () => {
		return pokemon[PF].find((pokemon) => pokemon.name === mon.species)
			.forms.find((form) => form.name === mon.form)
			.growthRate.slice(6);
	};
</script>

<Heading tag="h6" class="mb-3">Held Item</Heading>
<DropdownSearch
	bind:value={mon.heldItem}
	options={['None', ...items[PF].map((item) => item.name)]}
/>

<Heading tag="h6" class="mt-3 mb-3">Ability</Heading>
<DropdownSearch
	bind:value={mon.ability}
	options={pokemon[PF].find((pokemon) => pokemon.name === mon.species).forms.find(
		(form) => form.name === mon.form
	).abilities}
/>

<Heading tag="h6" class="mt-3 mb-3">Level</Heading>
<ButtonGroup>
	<Button
		type="button"
		onclick={() => {
			mon.level = decrement(mon.level, 1, 100);
			setExpForLvl();
		}}
		class="p-2!"
	>
		<MinusOutline class="size-6" />
	</Button>
	<Input
		bind:value={mon.level}
		type="number"
		onfocusout={() => {
			mon.level = enforce(mon.level, 1, 100);
			setExpForLvl();
		}}
		class="w-15 [appearance:textfield] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
	/>
	<Button
		type="button"
		onclick={() => {
			mon.level = increment(mon.level, 1, 100);
			setExpForLvl();
		}}
		class="p-2!"
	>
		<PlusOutline class="size-6" />
	</Button>
</ButtonGroup>
