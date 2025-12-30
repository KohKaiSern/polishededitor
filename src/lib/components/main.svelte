<script lang="ts">
	import { Fileupload, Label, Helper, Toast, Button, Heading, DarkMode, Hr } from 'flowbite-svelte';
	import RadioSelect from '$ui/radio-select.svelte';
	import Instructions from '$components/instructions.svelte';
	import Party from '$components/party/party.svelte';
	import type { Data } from '$parsers/types';
	import parseSave from '$parsers/parseSave';
	import reverseParseSave from '$parsers/reverseParseSave';
	import { retrieve } from '$parsers/utils';
	import addresses from '$data/addresses.json';
	import versions from '$data/versions.json';
	import Boxes from '$components/boxes/boxes.svelte';

	let PF: 'polished' | 'faithful' = $state('polished');
	let data: Data | null = $state(null);
	let files: FileList | null = $state(null);
	let toastMsg: string = $state('');
	let toastStatus: boolean = $state(false);
	let editor: string = $state('Party');

	async function uploadSave(): Promise<void> {
		if (!files![0]) return;
		toastStatus = true;
		toastMsg = await validateSave(files![0]);
		try {
			data = parseSave(new Uint8Array(await files![0].arrayBuffer()), PF);
		} catch (error) {
			console.log(error);
			toastMsg = 'An unexpected bug has occured. Please report this to Rev3lation.';
		}
		if (toastMsg === 'Save Validated!') {
			setTimeout(() => {
				toastStatus = false;
			}, 5000);
		}
		return;
	}

	async function validateSave(file: File): Promise<string> {
		if (file.size < 32000 || file.size > 33000) {
			return "This doesn't seem like a save file. Make sure that it isn't an emulator save state.";
		}
		const buffer = new Uint8Array(await file.arrayBuffer());
		if (retrieve(buffer, addresses.sSaveVersion, 2) != versions.save) {
			return `This save file is not of the latest version. The current version is ${versions.game}.`;
		}
		return 'Save Validated!';
	}

	async function downloadSave(): Promise<void> {
		if (!files![0]) return;
		Object.assign(document.createElement('a'), {
			href: URL.createObjectURL(
				new Blob([
					reverseParseSave(new Uint8Array(await files![0].arrayBuffer()), data!, PF)
						.buffer as ArrayBuffer
				])
			),
			download: `${files![0].name.slice(0, -4)}_EDITED${files![0].name.slice(-4)}`
		}).click();
	}

	$inspect(data);
</script>

<Toast
	params={{ x: 200, duration: 800 }}
	{toastStatus}
	class="w-max-64 w-fit absolute right-4 top-4 z-10"
>
	{toastMsg}
</Toast>

<header class="flex justify-between mb-5 flex-wrap gap-5">
	<Heading tag="h1">
		<span class="dark:text-purple-500 text-purple-600">Polished</span> Editor
	</Heading>
	<div class="flex gap-5">
		<RadioSelect
			bind:value={PF}
			options={[
				{ text: 'Polished', id: 'polished' },
				{ text: 'Faithful', id: 'faithful' }
			]}
			onchange={uploadSave}
		/>
		<DarkMode
			class="size-10 outline-1 focus:outline-solid outline-gray-100 dark:outline-gray-700"
		/>
	</div>
</header>

<Label for="save" class="pb-2">Upload Save</Label>
<div class="flex gap-5 text-nowrap mb-2">
	<Fileupload id="save" accept=".srm,.sav" bind:files onchange={uploadSave} />
	<Button onclick={downloadSave} class="bg-purple-600 dark:bg-purple-500">Download Save</Button>
</div>
<Helper>.SRM / .SAV (Max. 33kB).</Helper>

<Instructions />

{#if data}
	<RadioSelect
		bind:value={editor}
		options={['Party', 'Boxes', 'Bag', 'Player'].map((e) => ({ id: e, text: e }))}
	/>
	<Hr class="my-5" />
	{#if editor === 'Party'}<Party bind:party={data.party} player={data.player} {PF} />{/if}
	{#if editor === 'Boxes'}<Boxes bind:boxes={data.boxes} player={data.player} {PF} />{/if}
	<!-- {#if editor === 'Bag'}<Bag bind:bag={data.bag} {PF} />{/if} -->
	<!-- {#if editor === 'Player'}<PlayerEditor bind:player={data.player} {PF} />{/if} -->
{/if}
