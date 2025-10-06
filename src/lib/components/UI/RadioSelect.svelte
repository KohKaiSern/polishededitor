<script>
	import { RadioButton, ButtonGroup } from 'flowbite-svelte';
	let { value = $bindable(), options } = $props();
</script>

<ButtonGroup>
	{#each options as option}
		<RadioButton
			value={option}
			bind:group={value}
			checkedClass="bg-purple-500 !text-white dark:bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-600"
		>
			{option}
		</RadioButton>
	{/each}
</ButtonGroup>
