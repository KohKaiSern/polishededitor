<script>
	import { Listgroup, ListgroupItem, P, Button } from 'flowbite-svelte';
	import { PlusOutline, TrashBinSolid } from 'flowbite-svelte-icons';
	import { DropdownSearch, NumberInput } from '$components/UI';
	import { items } from '$data';

	let { bag = $bindable(), PF, type, label, key, size } = $props();

	const addItem = (i) => {
		for (let item of items[PF]) {
			if (item.type === type) {
				bag[key].contents[i].name = item.name;
				break;
			}
		}
		bag[key].contents[i].qty = 1;
		bag[key].count += 1;
	};

	const deleteItem = (i) => {
		bag[key].contents = bag[key].contents
			.slice(0, i)
			.concat(bag[key].contents.slice(i + 1))
			.concat({ name: null, qty: null });
		bag[key].count -= 1;
	};
</script>

<Listgroup class="mt-5">
	<ListgroupItem class="flex justify-between italic">
		<P>{label}</P>
		<P>Quantity</P>
	</ListgroupItem>

	{#each Array(size) as _, i}
		{#if !!bag[key].contents[i].name}
			<ListgroupItem class="flex w-full justify-between">
				<div class="flex flex-col gap-3 pt-3">
					<DropdownSearch
						bind:value={bag[key].contents[i].name}
						options={items[PF].filter((item) => item.type === type).map((item) => item.name)}
					/>
					<P class="mb-1 w-full italic">
						{items[PF].find((item) => item.name === bag[key].contents[i].name).description}
					</P>
				</div>

				<div class="flex flex-wrap gap-2">
					<Button class="p-2!" color="red" outline onclick={() => deleteItem(i)}>
						<TrashBinSolid class="h-6 w-6" />
					</Button>
					<NumberInput bind:value={bag[key].contents[i].qty} min={1} max={99} />
				</div>
			</ListgroupItem>
		{:else}
			<ListgroupItem class="flex justify-between">
				<P class="mt-3 mb-3">Empty</P>
				{#if i === bag[key].count}
					<Button class="p-2!" onclick={() => addItem(i)} color="purple">
						<PlusOutline class="h-5 w-5" />
					</Button>
				{/if}
			</ListgroupItem>
		{/if}
	{/each}
</Listgroup>
