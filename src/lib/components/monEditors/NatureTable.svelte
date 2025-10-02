<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	const natures = [
		['', '↓ Attack', '↓ Defense', '↓ Sp. Atk', '↓ Sp. Def', '↓ Speed'],
		['↑ Attack', 'Hardy', 'Lonely', 'Adamant', 'Naughty', 'Brave'],
		['↑ Defense', 'Bold', 'Docile', 'Impish', 'Lax', 'Relaxed'],
		['↑ Sp. Atk', 'Modest', 'Mild', 'Bashful', 'Rash', 'Quiet'],
		['↑ Sp. Def', 'Calm', 'Gentle', 'Careful', 'Quirky', 'Sassy'],
		['↑ Speed', 'Timid', 'Hasty', 'Jolly', 'Naive', 'Serious']
	];
</script>

<div>
	<Table>
		<TableHead>
			{#each natures[0] as header}
				<TableHeadCell>{header}</TableHeadCell>
			{/each}
		</TableHead>
		<TableBody>
			{#each natures.slice(1) as row}
				<TableBodyRow>
					{#each row as cell, index}
						{#if index === 0}
							<TableHeadCell>{cell}</TableHeadCell>
						{:else}
							<TableBodyCell>{cell}</TableBodyCell>
						{/if}
					{/each}
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>
