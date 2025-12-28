<script lang="ts" generics="T">
	import { ButtonGroup, RadioButton } from 'flowbite-svelte';

	let {
		value = $bindable(),
		options,
		onchange = () => {},
		class: className
	}: {
		value: T;
		options: Array<{ text: string; id: T }>;
		onchange?: () => void;
		class?: string;
	} = $props();
</script>

<ButtonGroup class="{className} shadow-none">
	{#each options as { text, id }}
		<RadioButton
			outline
			value={id}
			bind:group={value}
			{onchange}
			class="h-10 border-none outline outline-gray-100 dark:outline-gray-700 hover:bg-purple-600 hover:dark:bg-purple-500"
			checkedClass="bg-purple-600 dark:bg-purple-500 !text-white"
		>
			{text}
		</RadioButton>
	{/each}
</ButtonGroup>
