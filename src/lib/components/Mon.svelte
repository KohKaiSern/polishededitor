<script>
	import { Card, Heading, P } from 'flowbite-svelte';
	let { mon = $bindable() } = $props();
</script>

<Card class="p-3">
	<Heading tag="h5">{mon.species}</Heading>
	<P>Lv. {mon.level}</P>
	<P>Held Item: {mon.heldItem}</P>
	<P>Ability: {mon.ability}</P>
	<P>Nature: {mon.nature}</P>
</Card>
