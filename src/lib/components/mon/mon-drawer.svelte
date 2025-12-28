<script lang="ts">
	import type { Form } from '$extractors/types';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import { Button, Heading, Hr } from 'flowbite-svelte';
	import Combobox from '$ui/combobox.svelte';

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

<Combobox bind:value={editor} options={['Basics', 'Stats', 'Moveset', 'Caught Data', 'Misc']} />

<Hr class="my-5" />

<div class="absolute bottom-5 left-5">
	<Button color="red" onclick={ondelete}>Delete Pokémon</Button>
</div>
