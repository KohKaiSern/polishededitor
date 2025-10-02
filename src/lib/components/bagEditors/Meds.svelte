<script>
	import {
		Listgroup,
		ListgroupItem,
		Heading,
		P,
		Input,
		Button,
		ButtonGroup
	} from 'flowbite-svelte';
	import { PlusOutline, MinusOutline, TrashBinSolid } from 'flowbite-svelte-icons';
	import DropdownSearch from '$components/DropdownSearch.svelte';
	import { increment, decrement, enforce } from '$components/monEditors/numberInputHelpers';
	import items from '$data/items.json';
	let { bag = $bindable(), PF } = $props();
	const addItem = (i) => {
		for (let item of items[PF]) {
			if (item.type === 'medicine') {
				bag.meds.contents[i].name = item.name;
				break;
			}
		}
		bag.meds.contents[i].qty = 1;
		bag.meds.count += 1;
	};
	const deleteItem = (i) => {
		bag.meds.contents = bag.meds.contents
			.slice(0, i)
			.concat(bag.meds.contents.slice(i + 1))
			.concat({ name: null, qty: null });
		bag.meds.count -= 1;
	};
</script>

<Listgroup class="mt-5">
	<ListgroupItem class="flex justify-between italic"><P>Medicine</P><P>Quantity</P></ListgroupItem>
	{#each Array(37) as _, i}
		{#if !!bag.meds.contents[i].name}
			<ListgroupItem class="flex w-full justify-between">
				<div class="flex flex-col gap-3 pt-3">
					<DropdownSearch
						bind:value={bag.meds.contents[i].name}
						options={items[PF].filter((item) => item.type === 'medicine').map((item) => item.name)}
					/>
					<P class="mb-1 w-full italic">
						{items[PF].find((item) => item.name === bag.meds.contents[i].name).description}
					</P>
				</div>
				<div class="flex flex-wrap gap-2">
					<Button class="p-2!" color="red" outline onclick={() => deleteItem(i)}
						><TrashBinSolid class="h-6 w-6" /></Button
					>
					<ButtonGroup>
						<Button
							type="button"
							onclick={() =>
								(bag.meds.contents[i].qty = decrement(bag.meds.contents[i].qty, 1, 99))}
							class="p-2!"
						>
							<MinusOutline class="size-6" />
						</Button>
						<Input
							bind:value={bag.meds.contents[i].qty}
							type="number"
							onfocusout={() =>
								(bag.meds.contents[i].qty = enforce(bag.meds.contents[i].qty, 1, 99))}
							class="w-15 [appearance:textfield] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
						/>
						<Button
							type="button"
							onclick={() =>
								(bag.meds.contents[i].qty = increment(bag.meds.contents[i].qty, 1, 99))}
							class="p-2!"
						>
							<PlusOutline class="size-6" />
						</Button>
					</ButtonGroup>
				</div>
			</ListgroupItem>
		{:else}
			<ListgroupItem class="flex justify-between">
				<P class="mt-3 mb-3">Empty</P>
				<Button class="p-2!" onclick={() => addItem(i)} color="purple">
					<PlusOutline class="h-5 w-5" />
				</Button>
			</ListgroupItem>
		{/if}
	{/each}
</Listgroup>
