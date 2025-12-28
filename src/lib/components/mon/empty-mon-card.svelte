<script lang="ts">
	import { Card, Heading, Button } from 'flowbite-svelte';
	import { PlusOutline } from 'flowbite-svelte-icons';

	interface EmptyMonCardProps {
		first: Boolean;
		onadd: () => void;
	}

	let { first = false, onadd }: EmptyMonCardProps = $props();
</script>

<Card class="p-5 max-w-none border-dashed">
	<div class="flex gap-3 justify-between items-center min-h-[40px]">
		<Heading tag="h5">Empty</Heading>
		{#if first}
			<Button class="p-2! border-gray-300 hover:bg-gray-300" outline color="dark" onclick={onadd}
				><PlusOutline class="text-gray-600 dark:text-gray-400" />
			</Button>
		{/if}
	</div>
</Card>
