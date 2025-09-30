<script>
	import { Heading, P, Label, Fileupload, Button, Helper, Toast } from 'flowbite-svelte';
	import { buf2hex, checkSaveVersion } from './SaveHandler.svelte.js';
	import parseMons from './parsers/parseMons.js';
	import parseItems from './parsers/parseItems.js';
	import { blur } from 'svelte/transition';

	let file = $state(null);
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
		mons = parseMons(fileHex);
		items = parseItems(fileHex);
		return;
	};
</script>

{#if toastMsg}
	<Toast transition={blur} params={{ amount: 10 }} class="absolute top-5 right-5">
		{toastMsg}
	</Toast>
{/if}

<header>
	<Heading tag="h1" class="mb-5">Polished Editor</Heading>
	<Label class="mb-2">Upload Save</Label>
	<div class="mb-2 flex gap-3">
		<Fileupload bind:files={file} onchange={handleSave} />
		<Button color="green" class="whitespace-nowrap">Download Save</Button>
	</div>
	<Helper>.SAV or .SRM (Max 33KB).</Helper>
</header>
