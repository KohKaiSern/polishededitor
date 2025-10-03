<script>
	import { Heading, ButtonGroup, RadioButton } from 'flowbite-svelte';
	import items from '$data/items.json';
	import pokemon from '$data/pokemon.json';
	import growthRates from '$data/growthRates.json';
	import { DropdownSearch, NumberInput } from '$components/UI';
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

	const resetSpecies = () => {
		const species = pokemon[PF].find((pokemon) => pokemon.name === mon.species);
		const form = species.forms[0];
		mon.form = form.name;
		mon.ability = form.abilities[0];
		setExpForLvl();
	};

	const resetForm = () => {
		const form = pokemon[PF].find((pokemon) => pokemon.name === mon.species).forms.find(
			(form) => form.name === mon.form
		);
		mon.ability = form.abilities[0];
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
		options={pokemon[PF].find((pokemon) => pokemon.name === mon.species).forms.map(
			(form) => form.name
		)}
		onchange={resetForm}
	/>
</div>

<Heading tag="h6" class="mt-3 mb-3">Held Item</Heading>
<DropdownSearch
	bind:value={mon.heldItem}
	options={['None', ...items[PF].map((item) => item.name)]}
/>

<Heading tag="h6" class="mt-3 mb-3">Ability</Heading>
<ButtonGroup>
	<RadioButton
		value={pokemon[PF].find((pokemon) => pokemon.name === mon.species).forms.find(
			(form) => form.name === mon.form
		).abilities[0]}
		bind:group={mon.ability}
		checkedClass="bg-purple-500 text-white dark:bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-600"
	>
		{pokemon[PF].find((pokemon) => pokemon.name === mon.species).forms.find(
			(form) => form.name === mon.form
		).abilities[0]}
	</RadioButton>
	<RadioButton
		value={pokemon[PF].find((pokemon) => pokemon.name === mon.species).forms.find(
			(form) => form.name === mon.form
		).abilities[1]}
		bind:group={mon.ability}
		checkedClass="bg-purple-500 text-white dark:bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-600"
	>
		{pokemon[PF].find((pokemon) => pokemon.name === mon.species).forms.find(
			(form) => form.name === mon.form
		).abilities[1]}
	</RadioButton>
	<RadioButton
		value={pokemon[PF].find((pokemon) => pokemon.name === mon.species).forms.find(
			(form) => form.name === mon.form
		).abilities[2]}
		bind:group={mon.ability}
		checkedClass="bg-purple-500 text-white dark:bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-600"
	>
		{pokemon[PF].find((pokemon) => pokemon.name === mon.species).forms.find(
			(form) => form.name === mon.form
		).abilities[2]}
	</RadioButton>
</ButtonGroup>

<Heading tag="h6" class="mt-3 mb-3">Level</Heading>
<NumberInput bind:value={mon.level} min={1} max={100} onchange={() => setExpForLvl()} />
