<script lang="ts">
	import items from '$data/items.json';
	let { heldItem, PF }: { heldItem: string; PF: 'polished' | 'faithful' } = $props();

	let itemSrc = $derived.by(() => {
		const spritePath = items[PF].find((i) => i.name === heldItem)!.spritePath;
		return `https://raw.githubusercontent.com/KohKaiSern/polishededitornew/refs/heads/main/src/${spritePath}`;
	});
</script>

<div
	class="size-[30px] flex bg-white rounded-lg justify-center items-center border border-gray-300 dark:border-none"
>
	{#if heldItem != 'None'}
		<img class="rounded-sm" src={itemSrc} alt={`Sprite of ${heldItem}`} />
	{/if}
</div>
