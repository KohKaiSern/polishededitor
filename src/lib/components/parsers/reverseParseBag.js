import addresses from '$data/addresses.json'
import items from '$data/items.json'

export const reverseParseBag = (fileHex, bag, PF) => {

  const address = parseInt(addresses.sBackupPlayerData, 16) + 943;

  for (let i = 0; i < bag.items.count; i++) {
    const itemNo = items[PF].find((item) => item.name === bag.items.contents[i].name).itemNo.toString(16);
    fileHex[address + (2 * i + 1)] = itemNo
    fileHex[address + 2 * (i + 1)] = bag.items.contents[i].qty.toString(16)
  }
  for (let i = 0; i < bag.meds.count; i++) {
    const itemNo = items[PF].find((item) => item.name === bag.meds.contents[i].name).itemNo.toString(16);
    fileHex[address + (2 * i + 1)] = itemNo
    fileHex[address + 2 * (i + 1)] = bag.meds.contents[i].qty.toString(16)
  }
  for (let i = 0; i < bag.balls.count; i++) {
    const itemNo = items[PF].find((item) => item.name === bag.balls.contents[i].name).itemNo.toString(16);
    fileHex[address + (2 * i + 1)] = itemNo
    fileHex[address + 2 * (i + 1)] = bag.balls.contents[i].qty.toString(16)
  }
  for (let i = 0; i < bag.berries.count; i++) {
    const itemNo = items[PF].find((item) => item.name === bag.berries.contents[i].name).itemNo.toString(16);
    fileHex[address + (2 * i + 1)] = itemNo
    fileHex[address + 2 * (i + 1)] = bag.berries.contents[i].qty.toString(16)
  }

	return fileHex;
}

export default reverseParseBag;
