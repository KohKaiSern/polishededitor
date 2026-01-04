import addresses from '$data/addresses.json';
import type { Pokedex } from '$parsers/types';

function reverseParsePokedex(file: Uint8Array, pokedex: Pokedex, PF: 'polished' | 'faithful'): Uint8Array {
  for (let dexString of Object.keys(pokedex)) {
    const dexNo = parseInt(dexString)
    const byte = Math.floor((dexNo - 1) / 8);
    const offset = (dexNo - 1) % 8

    if (pokedex[dexNo] === 2) {
      // Caught (and seen)
      file[addresses.wPokédexCaught + byte] |= (1 << offset);
      file[addresses.wPokédexSeen + byte] |= (1 << offset);
    } else if (pokedex[dexNo] === 1) {
      // Seen only (not caught)
      file[addresses.wPokédexCaught + byte] &= ~(1 << offset);
      file[addresses.wPokédexSeen + byte] |= (1 << offset);
    } else {
      // Not seen or caught
      file[addresses.wPokédexCaught + byte] &= ~(1 << offset);
      file[addresses.wPokédexSeen + byte] &= ~(1 << offset);
    }
  }
  return file
}
export default reverseParsePokedex
