<script lang="ts">
	import type { Form, Species } from '$extractors/types';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import { Button, Heading, Hr, Tabs, TabItem } from 'flowbite-svelte';
	import Basics from './basics.svelte';
	import DropdownSelect from '$ui/dropdown-select.svelte';

	interface MonDrawerProps {
		mon: PartyMon | BoxMon;
		species: Species;
		form: Form;
		PF: 'polished' | 'faithful';
		ondelete: () => void;
	}

	let { mon = $bindable(), species, form, PF, ondelete }: MonDrawerProps = $props();
	let editor = $state('Basics');
</script>

<Heading tag="h4" class="mb-5">Edit {mon.nickname.join('')}</Heading>

<div class="hidden sm:block">
	<Tabs
		tabStyle="underline"
		classes={{ active: 'text-black dark:text-white rounded-t-lg dark:bg-purple-500 bg-purple-600' }}
	>
		<TabItem title="Basics">
			<Basics bind:mon {species} {form} {PF} />
		</TabItem>
		<TabItem title="Stats"></TabItem>
		<TabItem title="Moves"></TabItem>
		<TabItem title="Caught"></TabItem>
		<TabItem title="Misc"></TabItem>
	</Tabs>
</div>

<div class="sm:hidden">
	<DropdownSelect bind:value={editor} options={['Basics', 'Stats', 'Moves', 'Caught', 'Misc']} />
	<Hr class="my-5" />
	{#if editor === 'Basics'}
		<Basics bind:mon {species} {form} {PF} />
	{:else if editor === 'Stats'}{:else if editor === 'Moves'}{:else if editor === 'Caught'}{:else if editor === 'Misc'}{/if}
</div>

<div class="absolute bottom-5 left-5">
	<Button color="red" onclick={ondelete}>Delete Pokémon</Button>
</div>
