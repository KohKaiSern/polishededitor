<script lang="ts">
	import type { BoxMon, PartyMon } from '$parsers/types';
	import MonSprite from '$ui/mon-sprite.svelte';
	import TypeIcon from '$ui/type-icon.svelte';
	import Healthbar from '$ui/healthbar.svelte';
	import MonDrawer from '$components/mon/mon-drawer.svelte';
	import { Card, Heading, P, Button, Drawer } from 'flowbite-svelte';
	import { EditSolid } from 'flowbite-svelte-icons';
	import pokemon from '$data/pokemon.json';
	import ItemIcon from '$ui/item-icon.svelte';
	import Heal from '$ui/heal.svelte';

	interface MonCardProps {
		mon: PartyMon | BoxMon;
		PF: 'polished' | 'faithful';
		ondelete: () => void;
	}

	let { mon = $bindable(), PF, ondelete }: MonCardProps = $props();

	let species = $derived(pokemon[PF].find((p) => p.name === mon.species)!);
	let form = $derived(species.forms.find((f) => f.name === mon.form)!);

	let open = $state(false);
	let innerHeight = $state(0);
	let innerWidth = $state(0);
</script>

<Card class="p-5 max-w-none relative">
	<div class="flex gap-1 mb-3">
		<MonSprite {mon} {PF} />
		<div class="flex flex-col justify-between">
			<Heading tag="h5">{mon.nickname.join('')}</Heading>
			<div class="flex gap-3">
				<ItemIcon heldItem={mon.heldItem} {PF} />
				{#each form.types as type}
					<TypeIcon {type} />
				{/each}
			</div>
		</div>
	</div>
	{#if 'currentHP' in mon && !mon.isEgg}
		<Healthbar {mon} />
	{/if}
	<P>Lv. {mon.level}</P>
	<P>Held Item: {mon.heldItem}</P>
	<P>Ability: {mon.ability}</P>
	<P>Nature: {mon.nature}</P>
	<div class="flex absolute bottom-5 right-5 gap-3">
		{#if 'currentHP' in mon && !mon.isEgg && (mon.status.name != 'None' || mon.currentHP != mon.stats[0])}
			<Heal bind:mon {PF} />
		{/if}
		<Button
			class="p-2! border-gray-300 hover:bg-gray-300"
			outline
			color="dark"
			onclick={() => (open = true)}><EditSolid class="text-gray-600 dark:text-gray-400" /></Button
		>
	</div>
</Card>

<Drawer
	bind:open
	placement={innerWidth > innerHeight ? 'right' : 'bottom'}
	class={innerWidth > innerHeight ? 'h-full w-[75%]' : 'h-[85%] w-full'}
	><MonDrawer
		bind:mon
		{form}
		{PF}
		ondelete={() => {
			ondelete();
			open = false;
		}}
	/></Drawer
>
<svelte:window bind:innerWidth bind:innerHeight />
