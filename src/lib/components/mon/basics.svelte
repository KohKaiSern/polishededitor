<script lang="ts">
	import type { Form, Species } from '$extractors/types';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import NumberInput from '$ui/number-input.svelte';
	import TextInput from '$ui/text-input.svelte';
	import { Heading } from 'flowbite-svelte';

	interface BasicsProps {
		mon: PartyMon | BoxMon;
		species: Species;
		form: Form;
		PF: 'polished' | 'faithful';
	}

	let { mon = $bindable(), species, form, PF }: BasicsProps = $props();

	function setExpForLvl(): void {
		mon.exp = Math.max(
			Math.floor((form.growthCFs[0] / form.growthCFs[1]) * mon.level ** 3) +
				form.growthCFs[2] * mon.level ** 2 +
				form.growthCFs[3] * mon.level -
				form.growthCFs[4],
			0
		);
	}
</script>

<Heading tag="h5">Nickname</Heading>
<TextInput bind:value={mon.nickname} maxLength={10} class="my-5" />

<Heading tag="h5" class="mb-[-10px]">Level</Heading>
<NumberInput bind:value={mon.level} min={1} max={100} onchange={setExpForLvl} />
