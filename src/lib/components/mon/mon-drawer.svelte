<script lang="ts">
	import type { Form } from '$extractors/types';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import { Button, Heading } from 'flowbite-svelte';
	import RadioSelect from '$ui/radio-select.svelte';

	interface MonDrawerProps {
		mon: PartyMon | BoxMon;
		form: Form;
		PF: 'polished' | 'faithful';
		ondelete: () => void;
	}

	let { mon = $bindable(), form, PF, ondelete }: MonDrawerProps = $props();

	let editor = $state('Basics');
</script>

<Heading tag="h4" class="mb-5">Edit {mon.nickname.join('')}</Heading>

<RadioSelect
	bind:value={editor}
	options={['Basics', 'Stats', 'Moves', 'Caught Data', 'Misc'].map((x) => ({ id: x, text: x }))}
/>

<div class="absolute bottom-5 left-5">
	<Button color="red" onclick={ondelete}>Delete Pokémon</Button>
</div>
