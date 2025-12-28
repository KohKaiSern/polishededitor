<script lang="ts">
	import type { BoxMon, PartyMon } from '$parsers/types';
	import { Card, Heading } from 'flowbite-svelte';

	interface MonCardProps {
		mon: PartyMon | BoxMon;
		PF: 'polished' | 'faithful';
		ondelete: () => void;
	}

	let { mon = $bindable(), PF, ondelete }: MonCardProps = $props();
</script>

<Card class="p-5 max-w-none">
	{JSON.stringify(mon)}
</Card>
