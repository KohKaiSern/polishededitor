<script lang="ts">
	import type { Form, Species } from '$extractors/types';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import NumberInput from '$ui/number-input.svelte';
	import TextInput from '$ui/text-input.svelte';
	import ItemIcon from '$ui/item-icon.svelte';
	import { Heading, P } from 'flowbite-svelte';
	import pokemon from '$data/pokemon.json';
	import items from '$data/items.json';
	import DropdownSelect from '$ui/dropdown-select.svelte';
	import Combobox from '$ui/combobox.svelte';

	interface BasicsProps {
		mon: PartyMon | BoxMon;
		species: Species;
		form: Form;
		PF: 'polished' | 'faithful';
	}

	let { mon = $bindable(), species, form, PF }: BasicsProps = $props();

	function resetMon(): void {
		mon.form = species.forms.find((f) => f.index === 1)!.name;
		resetForm();
	}
	function resetForm(): void {
		mon.ability = form.abilities[0];
		mon.gender = form.hasGender ? mon.gender : 'Genderless';
		setExpForLvl();
	}

	function setExpForLvl(): void {
		mon.exp = Math.max(
			Math.floor((form.growthCFs[0] / form.growthCFs[1]) * mon.level ** 3) +
				form.growthCFs[2] * mon.level ** 2 +
				form.growthCFs[3] * mon.level -
				form.growthCFs[4],
			0
		);
	}
</script>

<Heading tag="h5">Nickname</Heading>
<TextInput bind:value={mon.nickname} maxLength={10} class="my-5" />

<Heading tag="h5">Species & Form</Heading>
<div class="flex gap-3 my-5">
	<Combobox
		options={pokemon[PF].map((p) => p.name).filter((p) => !'?000?Egg?256?'.includes(p))}
		bind:value={mon.species}
		onchange={resetMon}
	/>
	<DropdownSelect
		options={species.forms.map((f) => f.name)}
		bind:value={mon.form}
		onchange={resetForm}
	/>
</div>

<Heading tag="h5" class="mb-5">Held Item</Heading>
{#if 'currentHP' in mon}
	<Combobox
		options={['None'].concat(items[PF].slice(1).map((item) => item.name))}
		bind:value={mon.heldItem}
	/>
{:else}
	<Combobox
		options={['None']
			.concat(items[PF].map((item) => item.name))
			.filter((name) => !name.includes('Mail'))}
		bind:value={mon.heldItem}
	/>
{/if}
<div class="flex items-center mt-5 gap-3">
	<ItemIcon heldItem={mon.heldItem} {PF} />
	{#if mon.heldItem === 'None'}
		<P italic>This Pokemon has no held item.</P>
	{:else}
		<P italic>{items[PF].find((i) => i.name === mon.heldItem)!.description}</P>
	{/if}
</div>

<Heading tag="h5" class="mt-5 mb-[-10px]">Level</Heading>
<NumberInput bind:value={mon.level} min={1} max={100} onchange={setExpForLvl} />
