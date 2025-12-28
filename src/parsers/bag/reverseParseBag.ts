import type { Item } from "$parsers/types"
import items from '$data/items.json'
import keyItems from "$data/keyItems.json"
import addresses from '$data/addresses.json'
import { insert } from "$parsers/utils";

function reverseParseBag(file: Uint8Array, bag: Record<string, Item[]>, PF: 'polished' | 'faithful'): Uint8Array {

  const reverseParseCountedSlot = (address: number, slot: Item[]): void => {
    file[address] = slot.length;
    for (let i = 0; i < slot.length; i++) {
      file[address + 1 + i * 2] = items[PF].find(item => item.name === slot[i].name)!.index
      file[address + 2 + i * 2] = slot[i].qty
    }
    file[address + 1 + slot.length * 2] = 0xFF;
  };

  const reverseParseFixedSlot = (address: number, slot: Item[], bytes = 1): void => {
    for (let i = 0; i < slot.length; i++) {
      file = insert(file, address + i * bytes, bytes, slot[i].qty);
    }
  };

  reverseParseCountedSlot(addresses.wNumItems, bag.items);
  reverseParseCountedSlot(addresses.wNumMedicine, bag.medicine);
  reverseParseCountedSlot(addresses.wNumBalls, bag.balls);
  reverseParseCountedSlot(addresses.wNumBerries, bag.berries);
  const flagArr = bag.TMHMs.map(x => x.qty.toString()).concat(Array(7).fill('0'))
  for (let i = 0; i < 11; i++) {
    file[addresses.wTMsHMs + i] = parseInt(flagArr.slice(i * 8, (i + 1) * 8).reverse().join(''), 2)
  }
  for (let i = 0; i < 39; i++) {
    if (i < bag.keyItems.length) {
      file[addresses.wKeyItems + i] = keyItems[PF].find(k => k.name === bag.keyItems[i].name)!.index
    } else {
      file[addresses.wKeyItems + i] = 0;
    }
  }
  file = insert(file, addresses.wCoins, 2, bag.coins[0].qty)
  reverseParseFixedSlot(addresses.wApricorns, bag.apricorns);
  reverseParseFixedSlot(addresses.wWingAmounts, bag.wings, 2);
  reverseParseFixedSlot(addresses.wCandyAmounts, bag.candy);
  file = insert(file, addresses.wBlueCardBalance, 1, bag.blueCard[0].qty);

  return file
}

export default reverseParseBag
