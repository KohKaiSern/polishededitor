<script>
	import { Heading, P } from 'flowbite-svelte';
	import { NumberInput, RadioSelect } from '$components/UI';
	let { mon = $bindable() } = $props();
</script>

<Heading tag="h6" class="mb-3">Gender</Heading>
{#if mon.gender === 'Genderless'}
	<P>This species has no gender.</P>
{:else}
	<RadioSelect bind:value={mon.gender} options={['Male', 'Female']} />{/if}

{#if !!mon.happiness}
	<Heading tag="h6" class="mt-3 mb-3">Happiness</Heading>
	<NumberInput bind:value={mon.happiness} min={0} max={255} />
{:else}
	<Heading tag="h6" class="mb-3">Hatch Cycles</Heading>
	<NumberInput bind:value={mon.hatchCycles} min={0} max={255} />
{/if}

<Heading tag="h6" class="mt-3 mb-3">Shininess</Heading>
<RadioSelect bind:value={mon.shininess} options={['Shiny', 'Not Shiny']} />
