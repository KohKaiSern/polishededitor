<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import type { PartyMon } from '$parsers/types';
	import moves from '$data/moves.json';

	let { mon = $bindable(), PF }: { mon: PartyMon; PF: 'polished' | 'faithful' } = $props();

	function heal(): void {
		mon.status = { name: 'None' };
		mon.currentHP = mon.stats[0];
		for (let i = 0; i < 4; i++) {
			if (mon.moveset[i] === 'None') {
				mon.powerPoints[i] = 0;
			} else {
				mon.powerPoints[i] = Math.max(
					(moves[PF].find((m) => m.name === mon.moveset[i])!.powerPoints * (5 + mon.PPUPs[i])) / 5,
					63
				);
			}
		}
	}
</script>

<Button color="dark" class="hover:text-green-600 hover:dark:text-green-500" outline onclick={heal}
	>Heal</Button
>
