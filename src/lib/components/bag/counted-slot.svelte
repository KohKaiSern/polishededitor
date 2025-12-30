<script lang="ts">
	import { Button, Listgroup, ListgroupItem, P } from 'flowbite-svelte';
	import { PlusOutline, TrashBinSolid } from 'flowbite-svelte-icons';
	import Combobox from '$ui/combobox.svelte';
	import NumberInput from '$ui/number-input.svelte';
	import type { Item } from '$parsers/types';
	import ItemIcon from '$ui/item-icon.svelte';
	import items from '$data/items.json';

	let {
		contents = $bindable(),
		capacity,
		itemList,
		PF
	}: {
		contents: Item[];
		capacity: number;
		itemList: any;
		PF: 'polished' | 'faithful';
	} = $props();

	const addItem = (): void => {
		contents.push({
			name: itemList[0].name,
			qty: 1
		});
	};

	const deleteItem = (i: number): void => {
		contents.splice(i, 1);
	};
</script>

<Listgroup class="mt-5">
	{#each Array(capacity) as _, i}
		<ListgroupItem class="flex w-full flex-wrap py-3 pr-7 sm:justify-between sm:flex-nowrap">
			{#if contents[i]}
				<div class="mt-2 mb-2 flex flex-col gap-4">
					<Combobox
						options={itemList.map((item: any) => item.name)}
						bind:value={contents[i].name}
					/>
					<div class="flex gap-5 items-center">
						<ItemIcon heldItem={contents[i].name} {PF} />
						<P>{items[PF].find((item) => item.name === contents[i].name)!.description}</P>
					</div>
				</div>
				<div class="flex gap-10 items-center justify-start sm:justify-end w-full sm:w-auto sm:ml-4">
					<Button class="p-2!" color="red" onclick={() => deleteItem(i)}>
						<TrashBinSolid class="h-6 w-6" />
					</Button>
					<div>
						<NumberInput bind:value={contents[i].qty} min={1} max={99} />
					</div>
				</div>
			{:else}
				<P class="my-2 mx-1 p-1">Empty</P>
				{#if contents[i - 1] || i === 0}
					<Button class="p-2! mr-1 bg-purple-600 dark:bg-purple-500" onclick={() => addItem()}>
						<PlusOutline class="h-5 w-5" />
					</Button>
				{/if}
			{/if}
		</ListgroupItem>
	{/each}
</Listgroup>
