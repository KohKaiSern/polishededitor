<script lang="ts">
	import { Heading, Label, P } from 'flowbite-svelte';
	import NumberInput from '$ui/number-input.svelte';
	import RadioSelect from '$ui/radio-select.svelte';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import type { Form } from '$extractors/types';

	let { mon = $bindable(), form }: { mon: PartyMon | BoxMon; form: Form } = $props();
	function changePokerus(): void {
		if (mon.pokerus.strain === 'None' || mon.pokerus.strain === 'Cured') {
			mon.pokerus = { strain: mon.pokerus.strain };
		} else {
			mon.pokerus.daysRemaining = Math.max(mon.pokerus.strain as number, 1);
		}
	}
	//Eggs cannot have HP
	function toggleEgg(): void {
		if (mon.isEgg) {
			if ('currentHP' in mon) {
				mon.currentHP = 0;
				mon.status = { name: 'None' };
			}
		} else {
			if ('currentHP' in mon) {
				mon.currentHP = mon.stats[0];
			}
		}
	}
</script>

{#if mon.isEgg}
	<Heading tag="h5" class="mb-[-10px]">Hatch Cycles</Heading>
{:else}
	<Heading tag="h5" class="mb-[-10px]">Happiness</Heading>
{/if}
<NumberInput bind:value={mon.happiness} min={0} max={255} />

<Heading tag="h5" class="my-5">Gender</Heading>
{#if form.hasGender}
	<RadioSelect
		bind:value={mon.gender}
		options={[
			{ text: 'Male', id: 'Male' },
			{ text: 'Female', id: 'Female' }
		]}
	/>
{:else}
	<P italic>This Pokemon is genderless.</P>
{/if}

<Heading tag="h5" class="mt-5 mb-5">Shininess</Heading>
<RadioSelect
	bind:value={mon.shininess}
	options={[
		{ text: 'Shiny', id: 'Shiny' },
		{ text: 'Not Shiny', id: 'Not Shiny' }
	]}
/>

<Heading tag="h5" class="mt-5 mb-5">Is Egg</Heading>
<RadioSelect
	bind:value={mon.isEgg}
	options={[
		{ text: 'Is Egg', id: true },
		{ text: 'Is Not Egg', id: false }
	]}
	onchange={toggleEgg}
/>

<Heading tag="h5" class="mt-5 mb-5 sm:mb-2">Pokerus</Heading>

<div class="flex gap-x-8 gap-y-5 flex-wrap items-center">
	<div class="hidden sm:block my-3">
		<RadioSelect
			bind:value={mon.pokerus.strain}
			options={[
				{ text: 'None', id: 'None' },
				{ text: 'Cured', id: 'Cured' },
				{ text: 'Strain 1', id: 1 },
				{ text: 'Strain 2', id: 2 },
				{ text: 'Strain 3', id: 3 },
				{ text: 'Strain 4', id: 4 }
			]}
			onchange={changePokerus}
		/>
	</div>

	<div class="flex gap-3 flex-wrap sm:hidden">
		<RadioSelect
			bind:value={mon.pokerus.strain}
			options={[
				{ text: 'None', id: 'None' },
				{ text: 'Cured', id: 'Cured' }
			]}
			onchange={changePokerus}
		/>
		<RadioSelect
			bind:value={mon.pokerus.strain}
			options={[
				{ text: 'Strain 1', id: 1 },
				{ text: 'Strain 2', id: 2 },
				{ text: 'Strain 3', id: 3 },
				{ text: 'Strain 4', id: 4 }
			]}
			onchange={changePokerus}
		/>
	</div>

	{#if 'daysRemaining' in mon.pokerus}
		<div class="flex flex-col">
			<Label class="mb-[-10px]">Days Remaining</Label>
			<NumberInput
				bind:value={mon.pokerus.daysRemaining!}
				min={1}
				max={mon.pokerus.strain as number}
			/>
		</div>
	{/if}
</div>
