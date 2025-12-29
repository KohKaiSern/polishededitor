<script lang="ts">
	import { Button, Dropdown } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	interface DropdownSelectProps {
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
	}: DropdownSelectProps = $props();

	let isOpen = $state(false);
</script>

<div class="flex align-middle">
	<div>
		<Button class="h-full bg-purple-600 dark:bg-purple-500 {className}">
			{value}
			<ChevronDownOutline class="ms-3 h-5 w-5" />
		</Button>
	</div>
	<Dropdown bind:isOpen class="w-65">
		<div class="max-h-60 overflow-y-auto">
			{#each options as option}
				<Button
					color="dark"
					outline
					class="border-0 w-full rounded-none justify-start px-4 py-3 text-black dark:text-white"
					onclick={() => {
						value = option;
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
