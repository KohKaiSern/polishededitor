<script lang="ts">
	import { Label } from 'flowbite-svelte';
	interface NumberInputProps {
		value: number;
		min: number;
		max: number;
		onchange?: () => void;
	}
	let { value = $bindable(), min, max, onchange = () => {} }: NumberInputProps = $props();
	let percent = $derived(((value - min) / (max - min)) * 100);
	let inputWidth = $derived(value.toString().length);

	function validate(v: number): number {
		if (!Number.isInteger(Number(v))) {
			return max;
		}
		if (Number(v) < min) {
			return min;
		}
		if (Number(v) > max) {
			return max;
		}
		return Number(v);
	}
</script>

<Label class="mb-2 flex justify-end">{min} - {max}</Label>
<div class="flex items-center gap-3">
	<input
		bind:value
		class="number-input !bg-transparent border rounded-md border-gray-100 dark:border-gray-700 text-center py-0.5 text-black dark:text-white font-bold focus:!outline-none"
		style:--input-width={inputWidth}
		onchange={() => {
			value = validate(value);
			onchange?.();
		}}
	/>
	<input
		type="range"
		bind:value
		{min}
		{max}
		{onchange}
		style:background="linear-gradient(to right, #ad46ff {percent}%, #e5e7eb {percent}%)"
	/>
</div>

<style>
	.number-input {
		width: calc(var(--input-width) * 1.7ch);
	}

	input[type='range'] {
		-webkit-appearance: none;
		width: 100%;
		height: 8px;
		border-radius: 5px;
		background: #e5e7eb;
	}
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 20px;
		height: 20px;
		background: white;
		border: 3px solid #ad46ff;
		border-radius: 50%;
		cursor: pointer;
	}
	input[type='range']::-moz-range-thumb {
		width: 20px;
		height: 20px;
		background: white;
		border: 3px solid #ad46ff;
		border-radius: 50%;
		cursor: pointer;
	}
</style>
