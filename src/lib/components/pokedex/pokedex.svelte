<script lang="ts">
	import pokemon from '$data/pokemon.json';
	import type { Pokedex } from '$parsers/types';
	import { ColoredCard, TypeIcon, Cycler } from '$ui';
	import { Heading } from 'flowbite-svelte';

	interface PokedexProps {
		pokedex: Pokedex;
		PF: 'polished' | 'faithful';
	}

	let { pokedex = $bindable(), PF }: PokedexProps = $props();
	let sortedMons = $derived.by(() => {
		const result = pokemon[PF].sort((a, b) => a.index - b.index).map((species) => ({
			id: species.id,
			index: species.index,
			name: species.name,
			forms: species.forms.sort((a, b) => a.index - b.index)
		}));
		return result;
	});
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
	{#each sortedMons as species}
		{#each species.forms as form}
			<ColoredCard types={form.types}>
				<div class="flex justify-between gap-5 items-center flex-wrap">
					<div class="flex items-center gap-5">
						<div
							class="flex size-[75px] items-center justify-center rounded-lg bg-white border border-gray-300 dark:border-none"
						>
							<img
								src={`https://raw.githubusercontent.com/KohKaiSern/polishededitor/refs/heads/main/src/${form.paths.sprite}normal.gif`}
								alt={`GIF of the front sprite of ${species.name}, ${form.name}`}
							/>
						</div>
						<div class="flex flex-col justify-between gap-5">
							<Heading tag="h5">
								{species.name}
								{#if form.name != 'Plain'}
									<span>: {form.name}</span>
								{/if}
							</Heading>
							<div class="flex gap-5">
								{#each form.types as type}
									<TypeIcon {type} />
								{/each}
							</div>
						</div>
					</div>
					<Cycler bind:value={pokedex[form.dexNo]} />
				</div>
			</ColoredCard>
		{/each}
	{/each}
</div>
