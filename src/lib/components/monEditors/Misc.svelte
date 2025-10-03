<script>
	import { Heading, ButtonGroup, P, RadioButton } from 'flowbite-svelte';
	import { NumberInput } from '$components/UI';
	let { mon = $bindable() } = $props();
</script>

<Heading tag="h6" class="mb-3">Gender</Heading>
{#if mon.gender === 'Genderless'}
	<P>This species has no gender.</P>
{:else}
	<ButtonGroup>
		<RadioButton
			value="Male"
			bind:group={mon.gender}
			checkedClass="bg-purple-500 text-white dark:bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-600"
		>
			Male
		</RadioButton>
		<RadioButton
			value="Female"
			bind:group={mon.gender}
			checkedClass="bg-purple-500 text-white dark:bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-600"
		>
			Female
		</RadioButton>
	</ButtonGroup>
{/if}

{#if !!mon.happiness}
	<Heading tag="h6" class="mt-3 mb-3">Happiness</Heading>
	<NumberInput bind:value={mon.happiness} min={0} max={255} />
{:else}
	<Heading tag="h6" class="mb-3">Hatch Cycles</Heading>
	<NumberInput bind:value={mon.hatchCycles} min={0} max={255} />
{/if}

<Heading tag="h6" class="mt-3 mb-3">Shininess</Heading>
<ButtonGroup>
	<RadioButton
		value="Shiny"
		bind:group={mon.shininess}
		checkedClass="bg-purple-500 text-white dark:bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-600"
	>
		Shiny
	</RadioButton>
	<RadioButton
		value="Not Shiny"
		bind:group={mon.shininess}
		checkedClass="bg-purple-500 text-white dark:bg-purple-500 hover:bg-purple-600 dark:hover:bg-purple-600"
	>
		Not Shiny
	</RadioButton>
</ButtonGroup>
