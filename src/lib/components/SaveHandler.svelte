<script>
	import { Heading, Label, Fileupload, Button, Helper, Toast, Toggle } from 'flowbite-svelte';
	import { buf2hex, hex2buf, checkSaveVersion } from './SaveHandler.svelte.js';
	import parseMons from './parsers/parseMons.js';
	import reverseParseMons from './parsers/reverseParseMons.js';
	import parseBag from './parsers/parseBag.js';
	import reverseParseBag from './parsers/reverseParseBag.js';
	import { blur } from 'svelte/transition';

	let file = $state(null);
	let checked = $state(true);
	let disabled = $state(false);
	let PF = $derived(checked ? 'polished' : 'faithful');
	let toastMsg = $state(null);
	let mons = $state(null);
	let bag = $state(null);

	// This function should:
	// #1: Verify the size of the file
	// #2: Parse and verify the save number of the file
	// #3: Run the mon parse
	// #4: Run the bag parse
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
		disabled = true;
		mons = parseMons(fileHex, PF);
		bag = parseBag(fileHex, PF);
		return;
	};

	const downloadSave = async () => {
		if (!file) return;
		let fileHex = buf2hex(await file[0].arrayBuffer());
		fileHex = reverseParseBag(reverseParseMons(fileHex, mons, PF), bag, PF);
		//Create Blob
		const buffer = hex2buf(fileHex);
		const blob = new Blob([buffer]);
		const link = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = link;
		a.download = `${file[0].name.slice(0, -4)}_EDITED${file[0].name.slice(-4)}`;
		a.click();
	};

	$inspect(mons);
	$inspect(bag);
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
		<Toggle color="purple" bind:checked {disabled}>{PF.at(0).toUpperCase() + PF.slice(1)}</Toggle>
	</div>
	<Label class="mb-2">Upload Save</Label>
	<div class="mb-2 flex gap-3">
		<Fileupload bind:files={file} onchange={handleSave} />
		<Button color="purple" class="whitespace-nowrap" onclick={downloadSave}>Download Save</Button>
	</div>
	<Helper>.SAV or .SRM (Max 33kB).</Helper>
</header>
