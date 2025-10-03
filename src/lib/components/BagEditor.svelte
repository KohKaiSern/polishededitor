<script>
	import Items from './bagEditors/Items.svelte';
	import Meds from './bagEditors/Meds.svelte';
	import Balls from './bagEditors/Balls.svelte';
	import Berries from './bagEditors/Berries.svelte';
	import { RadioSelect } from '$components/UI';
	let { bag = $bindable(), PF } = $props();
	let selectedSlot = $state('Items');
</script>

<RadioSelect bind:value={selectedSlot} options={['Items', 'Medicines', 'Balls', 'Berries']} />

{#if selectedSlot === 'Items'}<Items bind:bag {PF} />{/if}
{#if selectedSlot === 'Medicines'}<Meds bind:bag {PF} />{/if}
{#if selectedSlot === 'Balls'}<Balls bind:bag {PF} />{/if}
{#if selectedSlot === 'Berries'}<Berries bind:bag {PF} />{/if}
