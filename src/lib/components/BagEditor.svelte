<script>
	import { BagSection, TMsHMs } from '$components/bagEditors';
	import { RadioSelect } from '$components/UI';
	let { bag = $bindable(), PF } = $props();
	let selectedSlot = $state('Items');
	const slots = [
		{ type: 'item', label: 'Item', key: 'items', size: 75, option: 'Items' },
		{ type: 'medicine', label: 'Medicine', key: 'meds', size: 37, option: 'Medicines' },
		{ type: 'ball', label: 'Ball', key: 'balls', size: 25, option: 'Balls' },
		{ type: 'berries', label: 'Berry', key: 'berries', size: 31, option: 'Berries' },
    { option: 'TMs & HMs'}
	];
</script>

<RadioSelect bind:value={selectedSlot} options={slots.map((slot) => slot.option)} />

{#if selectedSlot === 'TMs & HMs'}
	<TMsHMs bind:bag />
{:else}
	<BagSection bind:bag {PF} {...slots.find((slot) => slot.option === selectedSlot)} />
{/if}
