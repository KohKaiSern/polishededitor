<script lang="ts">
	import { Button, Dropdown, Search } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	interface Combobox {
		value: string;
		options: string[];
		onchange?: () => void;
		class?: string;
	}

	let {
		value = $bindable(),
		options,
		onchange = () => {},
		class: className = ''
	}: Combobox = $props();

	let searchTerm = $state('');
	let isOpen = $state(false);
	const filteredOptions = $derived(
		options.filter((o: string) => o.toLowerCase().includes(searchTerm.toLowerCase()))
	);
</script>

<div class="flex align-middle">
	<div>
		<Button
			onclick={() => {
				isOpen = !isOpen;
			}}
			class="h-full bg-purple-600 dark:bg-purple-500 {className}"
		>
			{value}
			<ChevronDownOutline class="ms-3 h-5 w-5" />
		</Button>
	</div>
	<Dropdown bind:isOpen class="w-65">
		<div class="p-3">
			<Search bind:value={searchTerm} size="md" />
		</div>
		<div class="max-h-60 overflow-y-auto">
			{#each filteredOptions as option}
				<Button
					color="dark"
					outline
					class="border-0 w-full rounded-none justify-start px-4 py-3 text-black dark:text-white"
					onclick={() => {
						value = option;
						searchTerm = '';
						isOpen = false;
						onchange?.();
					}}
				>
					{option}
				</Button>
			{/each}
		</div>
	</Dropdown>
</div>
