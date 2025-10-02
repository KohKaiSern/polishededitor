<script>
	import { ButtonGroup, RadioButton } from 'flowbite-svelte';
	import Items from './bagEditors/Items.svelte';
	import Meds from './bagEditors/Meds.svelte';
	import Balls from './bagEditors/Balls.svelte';
	import Berries from './bagEditors/Berries.svelte';
	let { bag = $bindable(), PF } = $props();
	let selectedSlot = $state('items');
</script>

<ButtonGroup class="sticky top-5 left-5">
	<RadioButton
		value="items"
		bind:group={selectedSlot}
		checkedClass="bg-purple-500 text-white dark:bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-600"
	>
		Items
	</RadioButton>
	<RadioButton
		value="meds"
		bind:group={selectedSlot}
		checkedClass="bg-purple-500 text-white dark:bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-600"
	>
		Medicines
	</RadioButton>
	<RadioButton
		value="balls"
		bind:group={selectedSlot}
		checkedClass="bg-purple-500 text-white dark:bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-600"
	>
		Balls
	</RadioButton>
	<RadioButton
		value="berries"
		bind:group={selectedSlot}
		checkedClass="bg-purple-500 text-white dark:bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-600"
	>
		Berries
	</RadioButton>
</ButtonGroup>

{#if selectedSlot === 'items'}<Items bind:bag {PF} />{/if}
{#if selectedSlot === 'meds'}<Meds bind:bag {PF} />{/if}
{#if selectedSlot === 'balls'}<Balls bind:bag {PF} />{/if}
{#if selectedSlot === 'berries'}<Berries bind:bag {PF} />{/if}
