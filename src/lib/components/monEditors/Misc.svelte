<script>
	import { Heading, Input, ButtonGroup, Button, P, RadioButton } from 'flowbite-svelte';
	import { MinusOutline, PlusOutline } from 'flowbite-svelte-icons';
	import { increment, decrement, enforce } from './numberInputHelpers';
	let { mon = $bindable(), PF } = $props();
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
	<ButtonGroup>
		<Button
			type="button"
			onclick={() => (mon.happiness = decrement(mon.happiness, 0, 255))}
			class="p-2!"
		>
			<MinusOutline class="size-6" />
		</Button>
		<Input
			bind:value={mon.happiness}
			type="number"
			onfocusout={() => (mon.happiness = enforce(mon.happiness, 0, 255))}
			class="w-15 [appearance:textfield] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
		/>
		<Button
			type="button"
			onclick={() => (mon.happiness = increment(mon.happiness, 0, 255))}
			class="p-2!"
		>
			<PlusOutline class="size-6" />
		</Button>
	</ButtonGroup>
{:else}
	<Heading tag="h6" class="mb-3">Hatch Cycles</Heading>
	<ButtonGroup>
		<Button
			type="button"
			onclick={() => (mon.hatchCycles = decrement(mon.hatchCycles, 0, 255))}
			class="p-2!"
		>
			<MinusOutline class="size-6" />
		</Button>
		<Input
			bind:value={mon.hatchCycles}
			type="number"
			onfocusout={() => (mon.hatchCycles = enforce(mon.hatchCycles, 0, 255))}
			class="w-15 [appearance:textfield] text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
		/>
		<Button
			type="button"
			onclick={() => (mon.hatchCycles = increment(mon.hatchCycles, 0, 255))}
			class="p-2!"
		>
			<PlusOutline class="size-6" />
		</Button>
	</ButtonGroup>
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
