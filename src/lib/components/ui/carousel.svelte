<script lang="ts">
	import { Button, ButtonGroup, Input } from 'flowbite-svelte';
	import { AngleLeftOutline, AngleRightOutline } from 'flowbite-svelte-icons';

	let {
		value = $bindable(),
		min,
		max,
		class: className = ''
	}: {
		value: number;
		min: number;
		max: number;
		class?: string;
	} = $props();

	const increment = () => (value === max ? (value = min) : value++);
	const decrement = () => (value === min ? (value = max) : value--);
	const enforce = () => {
		if (typeof value != 'number') value = max;
		if (!Number.isInteger(value)) value = max;
		if (value < min || value > max) value = max;
	};
</script>

<ButtonGroup class={className}>
	<Button
		type="button"
		onclick={() => {
			decrement();
		}}
		class="p-2! bg-purple-600 dark:bg-purple-500 border-0 focus:ring-4 focus:!ring-purple-300 hover:bg-purple-600 hover:dark:bg-purple-500"
	>
		<AngleLeftOutline class="size-6 text-white" />
	</Button>
	<Input
		bind:value
		onfocusout={() => {
			enforce();
		}}
		class="h-10 focus:border-transparent focus:ring-4 focus:!ring-purple-300 text-center"
	/>
	<Button
		type="button"
		onclick={() => {
			increment();
		}}
		class="p-2! bg-purple-600 dark:bg-purple-500 border-0 focus:ring-4 focus:!ring-purple-300 hover:bg-purple-600 hover:dark:bg-purple-500"
	>
		<AngleRightOutline class="size-6 text-white" />
	</Button>
</ButtonGroup>
