<script>
	import { Card, Heading, P, Button, Drawer } from 'flowbite-svelte';
	import { EditSolid } from 'flowbite-svelte-icons';
	import pokemon from '$data/pokemon.json';
	import { getTypeColour, cammyFormat } from '$components/helpers';
	let { mon = $bindable(), PF } = $props();
	let open = $state(false);
	let innerWidth = $state(0);
	let innerHeight = $state(0);

	const getGIFURL = () => {
		// Format names to Cammy's format
		let species = mon.isEgg ? 'egg' : cammyFormat(mon.species);
		let form = mon.isEgg ? 'plain' : cammyFormat(mon.form);
		const shine = mon.shininess === 'Shiny' ? 'shiny' : 'normal';

		//Put it all together
		const formPath = form === 'plain' ? species : `${species}_${form}`;
		return `https://raw.githubusercontent.com/caomicc/polisheddex/refs/heads/main/public/sprites/pokemon/${formPath}/${shine}_front_animated.gif`;
	};

	const getType = () => {
		let species = pokemon[PF].find((pokemon) => pokemon.name === mon.species);
		let form = species.forms.find((form) => form.name === mon.form);

		if (!form) {
			form = species.forms[0];
		}

		return form.type;
	};
</script>

<Card class="relative p-5">
	<div class="mb-3 flex">
		<div class="mr-5 flex size-[70px] items-center justify-center rounded-lg bg-white">
			<img src={getGIFURL()} alt={`GIF of the front sprite of ${mon.name}`} />
		</div>
		<div class="flex flex-col justify-between">
			<Heading tag="h5">{mon.species}</Heading>
			<div class="flex gap-3">
				{#each getType() as type}
					<div
						class="flex size-[30px] items-center justify-center rounded-[50%]"
						style:background-color={getTypeColour(type)}
					>
						<img
							class="size-[60%] object-contain"
							src={`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${type}.svg`}
							alt={`${type} logo`}
						/>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<P>Lv. {mon.level}</P>
	<P>Held Item: {mon.heldItem}</P>
	<P>Ability: {mon.ability}</P>
	<P>Nature: {mon.nature}</P>
	<Button class="absolute right-5 bottom-5 p-2!" outline color="dark" onclick={() => (open = true)}
		><EditSolid /></Button
	>
</Card>

<Drawer
	bind:open
	placement={innerWidth > innerHeight ? 'right' : 'bottom'}
	class={innerWidth > innerHeight ? 'h-full w-[75%]' : 'h-[75%] w-full'}
></Drawer>

<svelte:window bind:innerWidth bind:innerHeight />
