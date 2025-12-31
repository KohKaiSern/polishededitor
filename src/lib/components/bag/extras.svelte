<script lang="ts">
	import apricorns from '$data/apricorns.json';
	import expCandy from '$data/expCandy.json';
	import wings from '$data/wings.json';
	import type { Bag } from '$parsers/types';
	import NumberInput from '$ui/number-input.svelte';
	import { Accordion, AccordionItem, Listgroup, ListgroupItem, P } from 'flowbite-svelte';

	let { bag = $bindable(), PF }: { bag: Bag; PF: 'polished' | 'faithful' } = $props();

	const src = (item: string, list: any): string => {
		const spritePath = list.find((i: any) => i.name === item)!.spritePath;
		return `https://raw.githubusercontent.com/KohKaiSern/polishededitornew/refs/heads/main/src/${spritePath}`;
	};
</script>

<Accordion class="mt-8">
	<AccordionItem>
		{#snippet header()}Game Corner Coins{/snippet}
		<NumberInput bind:value={bag.coins[0].qty} min={0} max={50000} />
	</AccordionItem>
	<AccordionItem>
		{#snippet header()}Experience Candy{/snippet}
		<Listgroup>
			{#each bag.candy as candy, i}
				<ListgroupItem class="flex w-full flex-wrap py-3 gap-3 sm:justify-between sm:flex-nowrap">
					<div class="flex items-center gap-3">
						<div
							class="size-[35px] flex bg-white rounded-lg justify-center items-center border
							border-gray-300 dark:border-none"
						>
							<img
								class="rounded-sm"
								src={src(candy.name, expCandy[PF])}
								alt={`Sprite of ${candy.name}`}
							/>
						</div>
						<P>{candy.name}</P>
					</div>
					<div>
						<NumberInput bind:value={bag.candy[i].qty} min={0} max={99} />
					</div>
				</ListgroupItem>
			{/each}
		</Listgroup>
	</AccordionItem>
	<AccordionItem>
		{#snippet header()}Apricorns{/snippet}
		<Listgroup>
			{#each bag.apricorns as apricorn, i}
				<ListgroupItem class="flex w-full flex-wrap py-3 gap-3 sm:justify-between sm:flex-nowrap">
					<div class="flex items-center gap-3">
						<div
							class="size-[35px] flex bg-white rounded-lg justify-center items-center border
							border-gray-300 dark:border-none"
						>
							<img
								class="rounded-sm"
								src={src(apricorn.name, apricorns[PF])}
								alt={`Sprite of ${apricorn.name}`}
							/>
						</div>
						<P>{`${apricorn.name}: ${apricorns[PF].find((a) => a.name === apricorn.name)!.ball}`}</P
						>
					</div>
					<div>
						<NumberInput bind:value={bag.apricorns[i].qty} min={0} max={99} />
					</div>
				</ListgroupItem>
			{/each}
		</Listgroup>
	</AccordionItem>
	<AccordionItem>
		{#snippet header()}Wings{/snippet}
		<Listgroup>
			{#each bag.wings as wing, i}
				<ListgroupItem class="flex w-full flex-wrap py-3 gap-3 sm:justify-between sm:flex-nowrap">
					<div class="flex items-center gap-3">
						<div
							class="size-[35px] flex bg-white rounded-lg justify-center items-center border
							border-gray-300 dark:border-none"
						>
							<img
								class="rounded-sm"
								src={src(wing.name, wings[PF])}
								alt={`Sprite of ${wing.name}`}
							/>
						</div>
						<P>{wing.name}</P>
					</div>
					<div>
						<NumberInput bind:value={bag.wings[i].qty} min={0} max={999} />
					</div>
				</ListgroupItem>
			{/each}
		</Listgroup>
	</AccordionItem>
	<AccordionItem>
		{#snippet header()}Blue Card Points{/snippet}
		<NumberInput bind:value={bag.blueCard[0].qty} min={0} max={30} />
	</AccordionItem>
</Accordion>
