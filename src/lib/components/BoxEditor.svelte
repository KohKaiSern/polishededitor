<script>
	import { Button, P, Card, Heading } from 'flowbite-svelte';
	import { CaretLeftSolid, CaretRightSolid } from 'flowbite-svelte-icons';
	import Mon from '$components/Mon.svelte';

	let { mons = $bindable(), PF } = $props();
	let boxNo = $state(1);
</script>

<section>
	<Card class="sticky top-3 w-fit p-3">
		<div class="flex flex-nowrap items-center gap-3">
			<Button color="purple" class="p-2!"
				><CaretLeftSolid
					class="size-4"
					onclick={() => {
						boxNo = boxNo === 1 ? 20 : boxNo - 1;
					}}
				/></Button
			><P>Box {boxNo}</P><Button color="purple" class="p-2!"
				><CaretRightSolid
					class="size-4"
					onclick={() => {
						boxNo = boxNo === 20 ? 1 : boxNo + 1;
					}}
				/></Button
			>
		</div>
	</Card>
	<div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
		{#each mons[boxNo - 1] as mon, i}
			{#if !!mon}
				<Mon bind:mon={mons[boxNo - 1][i]} {PF} />
			{:else}
				<Card class="p-5"><Heading tag="h5">Empty</Heading></Card>
			{/if}
		{/each}
	</div>
</section>
