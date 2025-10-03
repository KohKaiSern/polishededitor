<script>
	import { Button, ButtonGroup, Input } from 'flowbite-svelte';
	import { MinusOutline, PlusOutline } from 'flowbite-svelte-icons';

	let { value = $bindable(), min, max, onchange } = $props();

	const increment = (x, min, max) => (x === max ? min : x + 1);
	const decrement = (x, min, max) => (x === min ? max : x - 1);
	const enforce = (x, min, max) => {
		if (typeof x != 'number') return max;
		if (!Number.isInteger(x)) return max;
		if (x < min || x > max) return max;
		return x;
	};
</script>

<ButtonGroup>
	<Button
		type="button"
		onclick={() => {
			value = decrement(value, min, max);
			onchange?.();
		}}
		class="p-2!"
	>
		<MinusOutline class="size-6" />
	</Button>
	<Input
		bind:value
		type="number"
		onfocusout={() => {
			value = enforce(value, min, max);
			onchange?.();
		}}
		class="w-15 [appearance:textfield] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
	/>
	<Button
		type="button"
		onclick={() => {
			value = increment(value, min, max);
			onchange?.();
		}}
		class="p-2!"
	>
		<PlusOutline class="size-6" />
	</Button>
</ButtonGroup>
