<script>
	import { BagSection } from '$components/bagEditors';
	import { RadioSelect } from '$components/UI';
	let { bag = $bindable(), PF } = $props();
	let selectedSlot = $state('Items');
	const slots = [
		{ type: 'item', label: 'Item', key: 'items', size: 75, option: 'Items' },
		{ type: 'medicine', label: 'Medicine', key: 'meds', size: 37, option: 'Medicines' },
		{ type: 'ball', label: 'Ball', key: 'balls', size: 25, option: 'Balls' },
		{ type: 'berries', label: 'Berry', key: 'berries', size: 31, option: 'Berries' }
	];
</script>

<RadioSelect bind:value={selectedSlot} options={slots.map((slot) => slot.option)} />

<BagSection bind:bag {PF} {...slots.find((slot) => slot.option === selectedSlot)} />
