<script lang="ts">
	import items from '$data/items.json';
	import locations from '$data/locations.json';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import { Combobox, NumberInput, RadioSelect, TextInput } from '$ui';
	import { Heading, Label } from 'flowbite-svelte';

	let { mon = $bindable(), PF }: { mon: PartyMon | BoxMon; PF: 'polished' | 'faithful' } = $props();
</script>

<Heading tag="h5" class="mb-5">Original Trainer</Heading>
<div class="flex gap-5">
	<div class="flex flex-col gap-2">
		<Label>Nickname</Label>
		<TextInput bind:value={mon.OTNickname} maxLength={7} />
	</div>
	<div class="flex flex-col">
		<Label class="mb-[-10px]">ID</Label>
		<NumberInput bind:value={mon.OTID} min={0} max={65535} />
	</div>
</div>

<Heading tag="h5" class="mt-5 mb-5">Caught Data</Heading>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-5 mb-5">
	<div class="flex flex-col gap-2">
		<Label>Time of Day</Label>
		<RadioSelect
			bind:value={mon.caughtTime}
			options={[
				{ text: 'Day', id: 'Day' },
				{ text: 'Night', id: 'Night' },
				{ text: 'Morning', id: 'Morning' },
				{ text: 'Evening', id: 'Evening' }
			]}
		/>
	</div>
	<div class="flex flex-col gap-2">
		<Label>Ball</Label>
		<Combobox
			bind:value={mon.caughtBall}
			options={['Park Ball', ...items[PF].filter((i) => i.category === 'BALL').map((i) => i.name)]}
		/>
	</div>
	<div class="flex flex-col">
		<Label class="mb-[-10px]">Level</Label>
		<NumberInput bind:value={mon.caughtLevel} min={1} max={100} />
	</div>
	<div class="flex flex-col gap-2">
		<Label>Location</Label>
		<Combobox bind:value={mon.caughtLocation} options={locations[PF].map((l) => l.name)} />
	</div>
</div>
