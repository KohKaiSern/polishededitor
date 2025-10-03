import addresses from '$data/addresses.json';
import items from '$data/items.json';
import { bin2hex } from '../helpers.js';

export const reverseParseBag = (fileHex, bag, PF) => {
	const address = parseInt(addresses.sBackupPlayerData, 16) + 943;

	for (let i = 0; i < 75; i++) {
		if (i < bag.items.count) {
			const itemNo = items[PF].find(
				(item) => item.name === bag.items.contents[i].name
			).itemNo.toString(16);
			fileHex[address + (2 * i + 1)] = itemNo;
			fileHex[address + 2 * (i + 1)] = bag.items.contents[i].qty.toString(16);
		} else {
			fileHex[address + (2 * i + 1)] = 'FF';
			fileHex[address + 2 * (i + 1)] = '01';
		}
	}
	for (let i = 0; i < 37; i++) {
		if (i < bag.meds.count) {
			const itemNo = items[PF].find(
				(item) => item.name === bag.meds.contents[i].name
			).itemNo.toString(16);
			fileHex[address + 152 + (2 * i + 1)] = itemNo;
			fileHex[address + 152 + 2 * (i + 1)] = bag.meds.contents[i].qty.toString(16);
		} else {
			fileHex[address + 152 + (2 * i + 1)] = 'FF';
			fileHex[address + 152 + 2 * (i + 1)] = '01';
		}
	}
	for (let i = 0; i < 25; i++) {
		if (i < bag.balls.count) {
			const itemNo = items[PF].find(
				(item) => item.name === bag.balls.contents[i].name
			).itemNo.toString(16);
			fileHex[address + 228 + (2 * i + 1)] = itemNo;
			fileHex[address + 228 + 2 * (i + 1)] = bag.balls.contents[i].qty.toString(16);
		} else {
			fileHex[address + 228 + (2 * i + 1)] = 'FF';
			fileHex[address + 228 + 2 * (i + 1)] = '01';
		}
	}
	for (let i = 0; i < 31; i++) {
		if (i < bag.berries.count) {
			const itemNo = items[PF].find(
				(item) => item.name === bag.berries.contents[i].name
			).itemNo.toString(16);
			fileHex[address + 280 + (2 * i + 1)] = itemNo;
			fileHex[address + 280 + 2 * (i + 1)] = bag.berries.contents[i].qty.toString(16);
		} else {
			fileHex[address + 280 + (2 * i + 1)] = 'FF';
			fileHex[address + 280 + 2 * (i + 1)] = '01';
		}
	}
	const TMsHMs = bag.TMsHMs.contents.concat(Array(7).fill('0'));
	for (let i = 0; i < 11; i++) {
		fileHex[address - 50 + i] = bin2hex(
			TMsHMs.slice(i * 8, (i + 1) * 8)
				.toReversed()
				.join('')
		);
	}

	return fileHex;
};

export default reverseParseBag;
