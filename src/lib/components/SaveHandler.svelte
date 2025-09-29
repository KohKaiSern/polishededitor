<script>
	import { Heading, P, Label, Fileupload, Button, Helper } from 'flowbite-svelte';

	let file = $state(null);
	// This function should:
	// #1: Verify the size of the file
	// #2: Parse and verify the save number of the file
	// #3: Run the mon parse

	const handleSave = () => {
		return;
	};

	$inspect(file);
</script>

<header>
	<Heading tag="h1" class="mb-5">Polished Editor</Heading>
	<Label class="mb-2">Upload Save</Label>
	<div class="mb-2 flex gap-3">
		<Fileupload bind:files={file} onchange={handleSave} />
		<Button color="green" class="whitespace-nowrap">Download Save</Button>
	</div>
	<Helper>.SAV or .SRM (Max 33KB).</Helper>
</header>
