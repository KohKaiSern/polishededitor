<script>
	import { Heading, Label, Fileupload, Button, Helper, Toast, Toggle } from 'flowbite-svelte';
	import { buf2hex, checkSaveVersion } from './SaveHandler.svelte.js';
	import parseMons from './parsers/parseMons.js';
	import parseItems from './parsers/parseItems.js';
	import { blur } from 'svelte/transition';

	let file = $state(null);
	let checked = $state(true);
	let PF = $derived(checked ? 'polished' : 'faithful');
	let toastMsg = $state(null);
	let mons = $state(null);
	let items = $state(null);

	// This function should:
	// #1: Verify the size of the file
	// #2: Parse and verify the save number of the file
	// #3: Run the mon parse
	// #4: Run the item parse
	const handleSave = async () => {
		if (file[0].size > 33000) {
			toastMsg =
				"This doesn't seem like a save file. Make sure it's a battery save and not a save state.";
			return;
		}
		const fileHex = buf2hex(await file[0].arrayBuffer());
		toastMsg = checkSaveVersion(fileHex);
		if (toastMsg === 'Save Validated!') {
			setTimeout(() => {
				toastMsg = null;
			}, 3000);
		}
		mons = parseMons(fileHex, PF);
		items = parseItems(fileHex, PF);
		return;
	};

	$inspect(mons);
</script>

{#if toastMsg}
	<div transition:blur={{ amount: 10 }} class="absolute top-5 right-5">
		<Toast>
			{toastMsg}
		</Toast>
	</div>
{/if}

<header>
	<div class="mb-5 flex flex-wrap items-start justify-between gap-5">
		<Heading tag="h1">Polished Editor</Heading>
		<Toggle color="purple" bind:checked disabled={file === null ? false : true}
			>{PF.at(0).toUpperCase() + PF.slice(1)}</Toggle
		>
	</div>
	<Label class="mb-2">Upload Save</Label>
	<div class="mb-2 flex gap-3">
		<Fileupload bind:files={file} onchange={handleSave} />
		<Button color="purple" class="whitespace-nowrap">Download Save</Button>
	</div>
	<Helper>.SAV or .SRM (Max 33KB).</Helper>
</header>
