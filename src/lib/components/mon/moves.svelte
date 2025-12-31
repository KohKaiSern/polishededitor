<script lang="ts">
	import { Button, Heading, Card, Label, P } from 'flowbite-svelte';
	import { PlusOutline, TrashBinSolid } from 'flowbite-svelte-icons';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import type { Form } from '$extractors/types';
	import MoveCard from '$components/mon/move-card.svelte';
	import moves from '$data/moves.json';
	import NumberInput from '$ui/number-input.svelte';
	import ColoredCard from '$ui/colored-card.svelte';

	interface MovesProps {
		mon: PartyMon | BoxMon;
		form: Form;
		PF: 'polished' | 'faithful';
	}

	let { mon = $bindable(), form, PF }: MovesProps = $props();

	function onadd(i: number): void {
		mon.moveset[i] = 'Tackle';
	}

	function ondelete(i: number): void {
		mon.moveset.splice(i, 1);
		mon.moveset.push('None');
		mon.PPUPs[i] = 0;
		if ('currentHP' in mon) {
			mon.powerPoints[i] = 0;
		}
	}

	function resetPP(i: number): void {
		if ('currentHP' in mon) {
			mon.powerPoints[i] = Math.min(63, (data[i].powerPoints * (5 + mon.PPUPs[i])) / 5);
		}
	}

	let data = $derived(mon.moveset.map((move) => moves[PF].find((m) => m.name === move)!));
</script>

<Heading tag="h5">Moves</Heading>
<div class="flex flex-col gap-5 mt-7 w-full">
	{#each Array(4) as _, i}
		{#if mon.moveset[i] === 'None'}
			<Card class="p-5 min-h-40 w-full max-w-none">
				<div class="flex gap-5 justify-between">
					<Heading tag="h5">Empty</Heading>
					{#if mon.moveset[i - 1] != 'None' || i === 0}
						<Button
							class="p-2! border-gray-300 hover:bg-gray-300 size-11"
							outline
							color="dark"
							onclick={() => onadd(i)}
							><PlusOutline class="text-gray-600 dark:text-gray-400" />
						</Button>
					{/if}
				</div>
			</Card>
		{:else}
			<ColoredCard types={[data[i].type]}>
				<MoveCard
					bind:move={mon.moveset[i]}
					data={data[i]}
					{form}
					{PF}
					resetPP={() => resetPP(i)}
				/>
				<div class="flex sm:flex-nowrap flex-wrap gap-7">
					{#if 'powerPoints' in mon}
						<div class="flex flex-col w-full">
							<Label class="mb-[-10px]">Power Points</Label>
							<NumberInput
								bind:value={mon.powerPoints[i]}
								min={0}
								max={Math.min(63, (data[i].powerPoints * (5 + mon.PPUPs[i])) / 5)}
							/>
						</div>
					{/if}
					<div class="flex flex-col w-full">
						<Label class="mb-[-10px]">PP Ups Used</Label>
						<NumberInput
							bind:value={mon.PPUPs[i]}
							min={0}
							max={3}
							onchange={() => {
								if ('powerPoints' in mon) {
									if (
										mon.powerPoints[i] >
										Math.min(63, (data[i].powerPoints * (5 + mon.PPUPs[i])) / 5)
									) {
										mon.powerPoints[i] = Math.min(
											63,
											(data[i].powerPoints * (5 + mon.PPUPs[i])) / 5
										);
									}
								}
							}}
						/>
					</div>
				</div>
				<P italic>{data[i].description}</P>
				<div class="grid grid-cols-2 md:grid-cols-5 gap-3">
					<div>
						<Label>Base Power</Label>
						<P class="text-2xl">{data[i].basePower}</P>
					</div>
					<div>
						<Label>Accuracy</Label>
						<P class="text-2xl">{data[i].accuracy}%</P>
					</div>
					<div>
						<Label>Max PP</Label>
						<P class="text-2xl">{(data[i].powerPoints * (5 + mon.PPUPs[i])) / 5}</P>
					</div>
					<div>
						<Label>Category</Label>
						<P class="text-2xl"
							>{data[i].category.at(0)! + data[i].category.slice(1).toLowerCase()}</P
						>
					</div>
					<div>
						<Label>Effect Chance</Label>
						<P class="text-2xl">{data[i].effectChance}%</P>
					</div>
				</div>
				<div class="flex w-full justify-end">
					<Button class="p-2! size-11" color="red" onclick={() => ondelete(i)}
						><TrashBinSolid /></Button
					>
				</div>
			</ColoredCard>
		{/if}
	{/each}
</div>
