import addresses from '$data/addresses.json';
import pokemon from '$data/pokemon.json';
import type { Pokedex } from '$parsers/types';

function parsePokedex(file: Uint8Array, PF: 'polished' | 'faithful'): Pokedex {
  const pokedex: Pokedex = {}
  for (const mon of pokemon[PF]) {
    for (const form of mon.forms) {
      let dexValue = 0;
      const byte = Math.floor((form.dexNo - 1) / 8);
      const offset = (form.dexNo - 1) % 8
      //If it's been seen before, we make dexValue 1
      dexValue += (file[addresses.wPokédexSeen + byte] >> offset) & 0x1
      //If it's been caught before, we make dexValue 2
      dexValue += (file[addresses.wPokédexCaught + byte] >> offset) & 0x1
      pokedex[form.dexNo] = dexValue;
    }
  }
  return pokedex
}

export default parsePokedex;
