import addresses from '$data/addresses.json';
import items from '$data/items.json';

export const parseBag = (fileHex, PF) => {
	const address = parseInt(addresses.sBackupPlayerData, 16) + 943
  const bag = {
    items: {
      count: parseInt(fileHex[address], 16),
      contents: Array(75).fill(null).map(() => ({ name: null, qty: null }))
    },
    meds: {
      count: parseInt(fileHex[address + 152], 16),
      contents: Array(37).fill(null).map(() => ({ name: null, qty: null }))
    },
    balls: {
      count: parseInt(fileHex[address + 228], 16),
      contents: Array(25).fill(null).map(() => ({ name: null, qty: null }))
    },
    berries: {
      count: parseInt(fileHex[address + 280], 16),
      contents: Array(31).fill(null).map(() => ({ name: null, qty: null }))
    }
  }
  // Items
  for (let i = 0; i < bag.items.count; i++) {
    const name = items[PF][parseInt(fileHex[address + (2 * i + 1)], 16) - 1].name
    const qty = parseInt(fileHex[address + (2 * (i + 1))], 16)
    bag.items.contents[i].name = name
    bag.items.contents[i].qty = qty
  }
  for (let i = 0; i < bag.meds.count; i++) {
    const name = items[PF][parseInt(fileHex[address + 152 + (2 * i + 1)], 16) - 1].name
    const qty = parseInt(fileHex[address + 152 + (2 * (i + 1))], 16)
    bag.meds.contents[i].name = name
    bag.meds.contents[i].qty = qty
  }
  for (let i = 0; i < bag.balls.count; i++) {
    const name = items[PF][parseInt(fileHex[address + 228 +(2 * i + 1)], 16) - 1].name
    const qty = parseInt(fileHex[address + 228 + (2 * (i + 1))], 16)
    bag.balls.contents[i].name = name
    bag.balls.contents[i].qty = qty
  }
  for (let i = 0; i < bag.berries.count; i++) {
    const name = items[PF][parseInt(fileHex[address + 280 + (2 * i + 1)], 16) - 1].name
    const qty = parseInt(fileHex[address + 280 + (2 * (i + 1))], 16)
    bag.berries.contents[i].name = name
    bag.berries.contents[i].qty = qty
  }
  return bag;
}

export default parseBag;
