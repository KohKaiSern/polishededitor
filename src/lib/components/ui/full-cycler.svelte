<script lang="ts">
	import type { Pokedex } from '$parsers/types';
	import { Button } from 'flowbite-svelte';
	import { QuestionCircleSolid, EyeSolid, CheckCircleSolid } from 'flowbite-svelte-icons';

	interface FullCyclerProps {
		pokedex: Pokedex;
	}
	let { pokedex = $bindable() }: FullCyclerProps = $props();

	const configs = [
		{ bg: 'bg-gray-400', hover: 'hover:bg-gray-300', icon: QuestionCircleSolid, label: 'Unknown' },
		{ bg: 'bg-yellow-500', hover: 'hover:bg-yellow-400', icon: EyeSolid, label: 'Seen' },
		{ bg: 'bg-green-500', hover: 'hover:bg-green-400', icon: CheckCircleSolid, label: 'Caught' }
	];

	let currentValue = $state(0);
	const config = $derived(configs[currentValue]);

	function cycle(): void {
		const nextValue = (currentValue + 1) % 3;
		for (const key in pokedex) {
			pokedex[key] = nextValue;
		}
		currentValue = nextValue;
	}
</script>

<Button onclick={cycle} class="{config.bg} {config.hover} max-h-10">
	{@const Icon = config.icon}
	<Icon class="mr-2 ml-[-5px]" />
	{config.label}
</Button>
