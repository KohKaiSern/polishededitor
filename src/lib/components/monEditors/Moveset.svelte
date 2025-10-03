<script>
	import { P } from 'flowbite-svelte';
	import { DropdownSearch } from '$components/UI';
	import moves from '$data/moves.json';
	let { mon = $bindable(), PF } = $props();
	let MOVES = $derived.by(() => {
		const result = [];
		for (let move of mon.moves) {
			if (move === 'Empty') {
				result.push('Empty');
				continue;
			}
			result.push(moves[PF].find((MOVE) => MOVE.name === move));
		}
		return result;
	});
</script>

<div class="flex flex-col gap-3">
	{#each mon.moves as move, i}
		<div>
			<DropdownSearch
				bind:value={mon.moves[i]}
				options={['Empty', ...moves[PF].map((move) => move.name)]}
			/>
			{#if move === 'Empty'}
				<P class="mt-3">This moveslot is empty.</P>
			{:else}
				<div class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3">
					<P>Type: {MOVES[i].type.at(0).toUpperCase() + MOVES[i].type.slice(1)}</P>
					<P>Base Power: {MOVES[i].basePower}</P>
					<P>Accuracy: {MOVES[i].accuracy}</P>
					<P>Category: {MOVES[i].category.at(0).toUpperCase() + MOVES[i].category.slice(1)}</P>
					<P>Power Points: {MOVES[i].pp}</P>
					<P>Effect Chance: {MOVES[i].effectChance}</P>
				</div>
			{/if}
		</div>
	{/each}
</div>
