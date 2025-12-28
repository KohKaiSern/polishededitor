<script lang="ts">
	import { Progressbar, P } from 'flowbite-svelte';
	import type { PartyMon } from '$parsers/types';

	let { mon }: { mon: PartyMon } = $props();

	let HPPercent = $derived((mon.currentHP / mon.stats[0]) * 100);

	let status = $derived(
		{
			Paralysis: 'PRZ',
			Burn: 'BRN',
			Freeze: 'FRZ',
			Poison: 'PSN',
			Sleep: 'SLP'
		}[mon.status.name]
	);

	let statusColor = $derived(
		{
			Paralysis: '#fdae10',
			Burn: '#f94e00',
			Freeze: '#62ccd4',
			Poison: '#bc52e7',
			Sleep: '#7d7d7d'
		}[mon.status.name]
	);
</script>

<div class="flex items-center gap-3 w-[70%]">
	<P>HP</P><Progressbar
		color={HPPercent > 50 ? 'green' : HPPercent > 20 ? 'yellow' : 'red'}
		progress={HPPercent.toString()}
	/>
	{#if mon.status.name != 'None'}
		<div style:background-color={statusColor} class="rounded-md pl-2 pr-2">
			<P class="text-xs !text-gray-50">{status}</P>
		</div>
	{/if}
	{#if mon.currentHP === 0}
		<div class="bg-red-500 rounded-md pl-2 pr-2">
			<P class="text-xs !text-white">FNT</P>
		</div>
	{/if}
</div>
