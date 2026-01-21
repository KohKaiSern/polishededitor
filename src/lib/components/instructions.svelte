<script lang="ts">
	import { P, Li, List } from 'flowbite-svelte';
</script>

<P class="mt-5">
	Polished Editor is a save editor/cheat device for Polished Crystal. It auto-updates by scraping
	game files. <br />
	Contact Rev3lation on the Polished Crystal Discord Server (in #save-editor) to report bugs (bad eggs,
	corrupted saves, etc).
	<br />
	I am not responsible for any corrupted saves - please backup your original saves. <br /> <br />
	Instructions for use:
</P>
<List tag="ol" class="dark:text-white text-black mb-5">
	<Li>Toggle between Polished/Faithful mode depending on your game.</Li>
	<Li>Upload your save file. It should be a battery save, not an emulator save state.</Li>
	<Li>Edit your save data as desired.</Li>
	<Li>
		Download the edited save and replace your original save with it. Remember to backup your
		original save.
	</Li>
	<Li>Rename your edited save to match the original one.</Li>
</List>
<P class="mb-5">
	<em class="font-italic">Credits: Rev3lation, Sylvie (Rangi42), Cammy, Emi, FIQ, Darsh</em><br />
	<a href="https://github.com/KohKaiSern/polishededitor" class="underline text-blue-500"
		>GitHub Repository</a
	>
</P>
