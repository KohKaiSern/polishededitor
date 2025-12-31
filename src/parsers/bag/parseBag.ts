import addresses from '$data/addresses.json';
import apricorns from '$data/apricorns.json';
import expCandy from '$data/expCandy.json';
import items from '$data/items.json';
import keyItems from '$data/keyItems.json';
import wings from '$data/wings.json';
import type { Bag, Item } from '$parsers/types';
import { retrieve } from '$parsers/utils';

function parseBag(file: Uint8Array, PF: 'polished' | 'faithful'): Bag {
	const bag: Bag = {};

	const parseCountedSlot = (address: number): Item[] => {
		const count = file[address];
		const contents: Item[] = [];
		for (let i = 0; i < count; i++) {
			contents[i] = {
				name: items[PF].find((item) => item.index === file[address + 1 + i * 2])!.name,
				qty: file[address + 2 + i * 2]
			};
		}
		return contents;
	};

	const parseFixedItemSlot = (address: number, itemNames: string[], bytes = 1): Item[] => {
		const contents: Item[] = [];
		for (let i = 0; i < itemNames.length; i++) {
			contents.push({ name: itemNames[i], qty: retrieve(file, address + i * bytes, bytes) });
		}
		return contents;
	};

	bag.items = parseCountedSlot(addresses.wNumItems);
	bag.medicine = parseCountedSlot(addresses.wNumMedicine);
	bag.balls = parseCountedSlot(addresses.wNumBalls);
	bag.berries = parseCountedSlot(addresses.wNumBerries);
	let flagStr = '';
	for (let i = 0; i < 11; i++) {
		flagStr += file[addresses.wTMsHMs + i]
			.toString(2)
			.padStart(8, '0')
			.split('')
			.reverse()
			.join('');
	}
	bag.TMHMs = Array.from({ length: 81 }, (_, i) => ({
		name: i >= 75 ? `HM0${i - 74}` : `TM${(i + 1).toString().padStart(2, '0')}`,
		qty: parseInt(flagStr[i])
	}));
	bag.keyItems = [];
	for (let i = 0; i < 39; i++) {
		if (file[addresses.wKeyItems + i] === 0) break;
		bag.keyItems.push({
			name: keyItems[PF].find((item) => item.index === file[addresses.wKeyItems + i])!.name,
			qty: 1
		});
	}
	bag.coins = [
		{
			name: 'Coins',
			qty: retrieve(file, addresses.wCoins, 2)
		}
	];
	bag.apricorns = parseFixedItemSlot(
		addresses.wApricorns,
		apricorns[PF].map((a) => a.name)
	);
	bag.wings = parseFixedItemSlot(
		addresses.wWingAmounts,
		wings[PF].map((w) => w.name),
		2
	);
	bag.candy = parseFixedItemSlot(
		addresses.wCandyAmounts,
		expCandy[PF].map((c) => c.name)
	);
	bag.blueCard = [
		{
			name: 'Blue Card Points',
			qty: file[addresses.wBlueCardBalance]
		}
	];

	return bag;
}

export default parseBag;
