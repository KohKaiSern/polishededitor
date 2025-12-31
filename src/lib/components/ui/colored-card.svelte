<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import type { Snippet } from 'svelte';
	interface ColoredCardProps {
		types: string[];
		class?: string;
		children: Snippet;
	}

	let { types, class: className, children }: ColoredCardProps = $props();

	let borderColors = $derived(
		types.map(
			(t) =>
				({
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
				})[t]
		)
	);

	let cardStyle = $derived.by(() => {
		if (borderColors.length === 1) {
			return `background: ${borderColors[0]}; padding: 4px; border-radius: 0.65rem;`;
		} else {
			return `background: linear-gradient(to bottom right, ${borderColors[0]}, ${borderColors[1]}); padding: 4px; border-radius: 0.65rem;`;
		}
	});
</script>

<div style={cardStyle}>
	<Card class="p-6 max-w-none relative border-0 shadow-md">
		{@render children()}
	</Card>
</div>
