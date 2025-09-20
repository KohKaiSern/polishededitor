<script>
	import { Heading, P, Label, Fileupload, Button } from 'flowbite-svelte';
</script>

<header>
	<Heading tag="h1" class="mb-5">Polished Editor</Heading>
	<Label class="mb-3">Upload Save</Label>
	<div class="flex gap-3">
		<Fileupload />
		<Button color="green" class="whitespace-nowrap">Download Save</Button>
	</div>
</header>
