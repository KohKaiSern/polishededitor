<script>
	import { Heading, P, Label, Fileupload, Button, Helper } from 'flowbite-svelte';
	
	let file = $state(null);

	const handleSave = () => {
		return
	}

	$inspect(file)
</script>

<header>
	<Heading tag="h1" class="mb-5">Polished Editor</Heading>
	<Label class="mb-2">Upload Save</Label>
	<div class="flex gap-3 mb-2">
		<Fileupload bind:files={file} onchange={handleSave}/>
		<Button color="green" class="whitespace-nowrap">Download Save</Button>
	</div>
	<Helper>.SAV or .SRM (Max 33KB).</Helper>
</header>
