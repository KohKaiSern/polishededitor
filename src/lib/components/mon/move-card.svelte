<script lang="ts">
	import moves from '$data/moves.json';
	import type { Form, Move } from '$extractors/types';
	import { TypeIcon } from '$ui';
	import { Button, ButtonGroup, Dropdown, Search } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	interface MoveCardProps {
		move: string;
		data: Move;
		form: Form;
		PF: 'polished' | 'faithful';
		resetPP: () => void;
	}

	let { move = $bindable(), data, form, PF, resetPP }: MoveCardProps = $props();

	let groupOpen = $state(false);
	let selectedGroup = $state('Level-Up Moves');
	let moveOpen = $state(false);
	let searchTerm = $state('');
	let moveList = $derived.by(() => {
		if (selectedGroup === 'Level-Up Moves') {
			return form.learnsets.level.map((m) => m.name);
		} else if (selectedGroup === 'Egg Moves') {
			return form.learnsets.egg.map((m) => m.name);
		} else if (selectedGroup === 'Evo Move') {
			return form.learnsets.evo.map((m) => m.name);
		} else if (selectedGroup === 'TM & HM Moves') {
			return form.learnsets.tmhm.map((m) => m.name);
		} else {
			return moves[PF].slice(1, -1).map((m) => m.name);
		}
	});
	let filteredMoves = $derived(
		moveList.filter((move) => move.toLowerCase().includes(searchTerm.toLowerCase()))
	);
</script>

<ButtonGroup class="flex-wrap sm:flex-nowrap gap-5 sm:gap-0">
	<div>
		<Button class="h-full text-black dark:text-white sm:rounded-r-none text-nowrap py-4 px-5">
			{selectedGroup}
			<ChevronDownOutline class="ms-3 h-5 w-5" />
		</Button>
	</div>
	<Dropdown bind:isOpen={groupOpen} class="w-65">
		<div class="max-h-60 overflow-y-auto">
			{#each ['Level-Up Moves', 'Egg Moves', 'Evo Move', 'TMs & HMs', 'All Moves'] as option}
				<Button
					color="dark"
					outline
					class="border-0 w-full rounded-none justify-start px-4 py-3 text-black dark:text-white"
					onclick={() => {
						selectedGroup = option;
						groupOpen = false;
					}}
				>
					{option}
				</Button>
			{/each}
		</div>
	</Dropdown>
	<div class="w-full">
		<Button
			class="h-full sm:rounded-l-none text-black dark:text-white py-4 px-5 w-full flex justify-between"
		>
			<div class="flex gap-4 items-center">
				<TypeIcon type={data.type} />
				{move}
			</div>
			<ChevronDownOutline class="ms-3 h-5 w-5" />
		</Button>
	</div>
	<Dropdown bind:isOpen={moveOpen} class="w-65">
		<div class="p-3">
			<Search bind:value={searchTerm} size="md" />
		</div>
		<div class="max-h-60 overflow-y-auto">
			{#each filteredMoves as option}
				<Button
					color="dark"
					outline
					class="border-0 w-full rounded-none justify-start px-4 py-3 text-black dark:text-white"
					onclick={() => {
						move = option;
						searchTerm = '';
						moveOpen = false;
						resetPP();
					}}
				>
					<div class="w-full flex justify-between">
						<span>
							{option}
						</span>
						<span>
							{#if selectedGroup === 'Level-Up Moves'}
								Lv. {form.learnsets.level.find((m) => m.name === option)!.level}
							{/if}
						</span>
					</div>
				</Button>
			{/each}
		</div>
	</Dropdown>
</ButtonGroup>
