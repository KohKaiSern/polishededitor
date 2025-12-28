<script lang="ts">
	let { type }: { type: string } = $props();

	let typeColor = $derived(
		{
			BUG: '#92BC2C',
			DARK: '#595761',
			DRAGON: '#0C69C8',
			ELECTRIC: '#F2D94E',
			FIRE: '#FBA54C',
			FAIRY: '#EE90E6',
			FIGHTING: '#D3425F',
			FLYING: '#A1BBEC',
			GHOST: '#5F6DBC',
			GRASS: '#5FBD58',
			GROUND: '#DA7C4D',
			ICE: '#75D0C1',
			NORMAL: '#A0A29F',
			POISON: '#B763CF',
			PSYCHIC: '#FA8581',
			ROCK: '#C9BB8A',
			STEEL: '#5695A3',
			WATER: '#539DDF',
			UNKNOWN_T: '#666666'
		}[type]
	);
</script>

<div
	class="flex size-[30px] items-center justify-center rounded-[50%]"
	style:background-color={typeColor}
>
	{#if type === 'UNKNOWN_T'}
		<div class="text-lg">?</div>
	{:else}
		<img
			class="size-[60%] object-contain"
			src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${type.toLowerCase()}.svg`}
			alt={`${type} logo`}
		/>
	{/if}
</div>
