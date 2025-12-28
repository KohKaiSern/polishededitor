<script lang="ts">
	import pokemon from '$data/pokemon.json';
	import type { BoxMon, PartyMon } from '$parsers/types';

	let { mon, PF }: { mon: PartyMon | BoxMon; PF: 'polished' | 'faithful' } = $props();

	let src = $derived.by(() => {
		let path = pokemon[PF].find((p) => p.name === mon.species)!.forms.find(
			(form) => form.name === mon.form
		)!.paths.sprite;
		if (mon.isEgg) {
			path = 'gfx/pokemon/egg/';
		}
		path += mon.shininess === 'Shiny' ? 'shiny' : 'normal';
		return `https://raw.githubusercontent.com/KohKaiSern/polishededitornew/refs/heads/main/src/${path}.gif`;
	});
</script>

<div
	class="mr-5 flex size-[75px] items-center justify-center rounded-lg bg-white border border-gray-300 dark:border-none"
>
	<img {src} alt={`GIF of the front sprite of ${mon.species}`} />
</div>
