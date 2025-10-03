<script>
	import { Heading } from 'flowbite-svelte';
	import { DropdownSearch, NumberInput, RadioSelect } from '$components/UI';
	import { items, pokemon, growthRates } from '$data';
	import { getPokemon, getForm } from '../utils.js';
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
		return getForm(mon.species, mon.form, PF).growthRate.slice(6);
	};

	const resetSpecies = () => {
		const form = getPokemon(mon.species, PF).forms[0];
		mon.form = form.name;
		mon.ability = form.abilities[0];
		setExpForLvl();
	};

	const resetForm = () => {
		mon.ability = getForm(mon.species, mon.form, PF).abilities[0];
		setExpForLvl();
	};
</script>

<Heading tag="h6" class="mb-3">Species & Form</Heading>
<div class="flex gap-3">
	<DropdownSearch
		class="flex-1"
		bind:value={mon.species}
		options={pokemon[PF].map((pokemon) => pokemon.name)}
		onchange={resetSpecies}
	/>
	<DropdownSearch
		class="flex-1"
		bind:value={mon.form}
		options={getPokemon(mon.species, PF).forms.map((form) => form.name)}
		onchange={resetForm}
	/>
</div>

<Heading tag="h6" class="mt-3 mb-3">Held Item</Heading>
<DropdownSearch
	bind:value={mon.heldItem}
	options={['None', ...items[PF].map((item) => item.name)]}
/>

<Heading tag="h6" class="mt-3 mb-3">Ability</Heading>
<RadioSelect bind:value={mon.ability} options={getForm(mon.species, mon.form, PF).abilities} />

<Heading tag="h6" class="mt-3 mb-3">Level</Heading>
<NumberInput bind:value={mon.level} min={1} max={100} onchange={() => setExpForLvl()} />
