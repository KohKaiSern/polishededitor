<script lang="ts">
	import RadioSelect from '$ui/radio-select.svelte';
	import items from '$data/items.json';
	import type { Item } from '$parsers/types';
	import CountedSlot from '$components/bag/counted-slot.svelte';
	import Extras from '$components/bag/extras.svelte';
	import KeyItems from '$components/bag/key-items.svelte';
	import TMHM from '$components/bag/tmhm.svelte';

	let { bag = $bindable(), PF }: { bag: Record<string, Item[]>; PF: 'polished' | 'faithful' } =
		$props();
	let selectedSlot = $state('items');
</script>

<div class="mt-5 hidden sm:block">
	<RadioSelect
		bind:value={selectedSlot}
		options={[
			{ text: 'Items', id: 'items' },
			{ text: 'Medicine', id: 'medicine' },
			{ text: 'Balls', id: 'balls' },
			{ text: 'TMs & HMs', id: 'TMsHMs' },
			{ text: 'Berries', id: 'berries' },
			{ text: 'Key Items', id: 'keyItems' },
			{ text: 'Extras', id: 'extras' }
		]}
	/>
</div>
<div class="mt-5 flex flex-col gap-3 sm:hidden">
	<RadioSelect
		bind:value={selectedSlot}
		options={[
			{ text: 'Items', id: 'items' },
			{ text: 'Medicine', id: 'medicine' },
			{ text: 'Balls', id: 'balls' },
			{ text: 'TMs & HMs', id: 'TMsHMs' }
		]}
	/>
	<RadioSelect
		bind:value={selectedSlot}
		options={[
			{ text: 'Berries', id: 'berries' },
			{ text: 'Key Items', id: 'keyItems' },
			{ text: 'Extras', id: 'extras' }
		]}
	/>
</div>

{#if ['items', 'medicine', 'balls', 'berries'].includes(selectedSlot)}
	<CountedSlot
		bind:contents={bag[selectedSlot]}
		capacity={{
			items: 75,
			medicine: 37,
			balls: 25,
			berries: 31
		}[selectedSlot]!}
		itemList={items[PF].filter(
			(item) =>
				item.category ===
				{
					items: 'ITEM',
					medicine: 'MEDICINE',
					balls: 'BALL',
					berries: 'BERRIES'
				}[selectedSlot]!
		)}
		{PF}
	/>
{/if}

{#if selectedSlot === 'TMsHMs'}
	<TMHM bind:contents={bag.TMHMs} {PF} />
{/if}

{#if selectedSlot === 'keyItems'}
	<KeyItems bind:contents={bag.keyItems} {PF} />
{/if}

{#if selectedSlot === 'extras'}
	<Extras bind:bag {PF} />
{/if}
