import addresses from '$data/addresses.json';

function parseBoxAddresses(file: Uint8Array): number[][] {
  const indexes = parseBoxIndexes(file);
  const flags = parseBoxFlags(file);
  const mons = Array(20)
    .fill(null)
    .map(() => Array(20).fill(null));
  for (let box = 0; box < 20; box++) {
    for (let i = 0; i < 20; i++) {
      if (indexes[box][i] === -1) continue;
      const block =
        (flags[box][i] === 0 ? '1' : '2') +
        (indexes[box][i] < 167 ? 'A' : indexes[box][i] < 195 ? 'B' : 'C');
      let address: number = addresses[`sBoxMons${block}` as keyof typeof addresses];
      if (block[1] === 'A') {
        address += indexes[box][i] * 49;
      } else if (block[1] === 'B') {
        address += (indexes[box][i] - 167) * 49;
      } else {
        address += (indexes[box][i] - 195) * 49;
      }
      mons[box][i] = address;
    }
  }
  return mons;
}

export default parseBoxAddresses;

function parseBoxIndexes(file: Uint8Array): number[][] {
  const indexes = Array(20)
    .fill(null)
    .map(() => Array(20).fill(-1));
  for (let box = 0; box < 20; box++) {
    for (let i = 0; i < 20; i++) {
      indexes[box][i] = file[addresses.sBackupNewBox1 + (33 * box + i)] - 1;
    }
  }
  return indexes;
}

function parseBoxFlags(file: Uint8Array): number[][] {
  const flags = Array(20)
    .fill(null)
    .map(() => Array(20).fill(0));
  for (let box = 0; box < 20; box++) {
    for (let i = 0; i < 20; i++) {
      flags[box][i] =
        (file[addresses.sBackupNewBox1 + 33 * box + 20 + Math.floor(i / 8)] >> (i % 8)) & 1;
    }
  }
  return flags;
}
