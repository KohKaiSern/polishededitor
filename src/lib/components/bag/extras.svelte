<script lang="ts">
	import apricorns from '$data/apricorns.json';
	import expCandy from '$data/expCandy.json';
	import wings from '$data/wings.json';
	import type { Bag } from '$parsers/types';
	import { NumberInput } from '$ui';
	import { Accordion, AccordionItem, Listgroup, ListgroupItem, P } from 'flowbite-svelte';

	let { bag = $bindable(), PF }: { bag: Bag; PF: 'polished' | 'faithful' } = $props();

	const src = (item: string, list: any): string => {
		const spritePath = list.find((i: any) => i.name === item)!.spritePath;
		return `https://raw.githubusercontent.com/KohKaiSern/polishededitornew/refs/heads/main/src/${spritePath}`;
	};

	interface ItemConfig {
		items: any[];
		dataSource: any;
		max: number;
		getLabel?: (item: any) => string;
	}

	const itemConfigs: Record<string, ItemConfig> = $derived({
		candy: {
			items: bag.candy,
			dataSource: expCandy[PF],
			max: 99
		},
		apricorns: {
			items: bag.apricorns,
			dataSource: apricorns[PF],
			max: 99,
			getLabel: (item) => `${item.name}: ${apricorns[PF].find((a) => a.name === item.name)!.ball}`
		},
		wings: {
			items: bag.wings,
			dataSource: wings[PF],
			max: 999
		}
	});
</script>

<Accordion class="mt-8">
	<AccordionItem>
		{#snippet header()}Game Corner Coins{/snippet}
		<NumberInput bind:value={bag.coins[0].qty} min={0} max={50000} />
	</AccordionItem>

	{#each Object.entries(itemConfigs) as [key, config]}
		<AccordionItem>
			{#snippet header()}{key.charAt(0).toUpperCase() +
					key.slice(1).replace(/([A-Z])/g, ' $1')}{/snippet}
			<Listgroup>
				{#each config.items as item, i}
					<ListgroupItem class="flex w-full flex-wrap py-3 gap-3 sm:justify-between sm:flex-nowrap">
						<div class="flex items-center gap-3">
							<div
								class="size-[35px] flex bg-white rounded-lg justify-center items-center border
								border-gray-300 dark:border-none"
							>
								<img
									class="rounded-sm"
									src={src(item.name, config.dataSource)}
									alt={`Sprite of ${item.name}`}
								/>
							</div>
							<P>{config.getLabel ? config.getLabel(item) : item.name}</P>
						</div>
						<div>
							<NumberInput bind:value={config.items[i].qty} min={0} max={config.max} />
						</div>
					</ListgroupItem>
				{/each}
			</Listgroup>
		</AccordionItem>
	{/each}

	<AccordionItem>
		{#snippet header()}Blue Card Points{/snippet}
		<NumberInput bind:value={bag.blueCard[0].qty} min={0} max={30} />
	</AccordionItem>
</Accordion>
