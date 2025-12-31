<script lang="ts">
	import Basics from '$components/mon/basics.svelte';
	import Caught from '$components/mon/caught.svelte';
	import Misc from '$components/mon/misc.svelte';
	import Moves from '$components/mon/moves.svelte';
	import Stats from '$components/mon/stats.svelte';
	import type { Form, Species } from '$extractors/types';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import DropdownSelect from '$ui/dropdown-select.svelte';
	import { Button, Heading, Hr, Tabs, TabItem } from 'flowbite-svelte';

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
		classes={{ active: 'text-white rounded-t-lg dark:bg-purple-500 bg-purple-600' }}
	>
		<TabItem title="Basics">
			<Basics bind:mon {species} {form} {PF} />
		</TabItem>
		<TabItem title="Stats">
			<Stats bind:mon {PF} />
		</TabItem>
		<TabItem title="Moves">
			<Moves bind:mon {form} {PF} />
		</TabItem>
		<TabItem title="Caught">
			<Caught bind:mon {PF} />
		</TabItem>
		<TabItem title="Misc">
			<Misc bind:mon {form} />
		</TabItem>
	</Tabs>
	<div class="ml-4">
		<Button color="red" onclick={ondelete}>Delete Pokémon</Button>
	</div>
</div>

<div class="sm:hidden">
	<DropdownSelect bind:value={editor} options={['Basics', 'Stats', 'Moves', 'Caught', 'Misc']} />
	<Hr class="my-5" />
	{#if editor === 'Basics'}
		<Basics bind:mon {species} {form} {PF} />
	{:else if editor === 'Stats'}
		<Stats bind:mon {PF} />
	{:else if editor === 'Moves'}
		<Moves bind:mon {form} {PF} />
	{:else if editor === 'Caught'}
		<Caught bind:mon {PF} />
	{:else if editor === 'Misc'}
		<Misc bind:mon {form} />
	{/if}
	<div class="mt-7">
		<Button color="red" onclick={ondelete}>Delete Pokémon</Button>
	</div>
</div>
