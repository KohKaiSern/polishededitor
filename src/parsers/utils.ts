import charmap from '$data/charmap.json';

//This function accesses a subset of bytes and interprets them as one number in big endian format.
export function retrieve(file: Uint8Array, address: number, bytes: number): number {
  let result = 0
  for (let i = 0; i < bytes; i++) {
    result = result << 8 | file[address + i]
  }
  return result
}

//This function takes a number and inserts it into a buffer array in big endian format.
export function insert(file: Uint8Array, address: number, bytes: number, x: number): Uint8Array {
  for (let i = 0; i < bytes; i++) {
    file[address + i] = (x >> ((bytes - i - 1) * 8)) & 0xFF
  }
  return file
}

export function readString(
  file: Uint8Array,
  address: number,
  length: number,
  hasChecksum: boolean
): string[] {
  const name = [];
  for (let i = 0; i < length; i++) {
    //Strings including checksums in their MSBs will always have their MSBs set for decoding.
    if (hasChecksum) {
      file[address + i] = 0x80 | file[address + i]
    }
    //Terminators (0x53 if there's no checksum, 0xFB if there is)
    if (file[address + i] === 0x53 || file[address + i] === 0xFB) break;
    //Space (0x7F if there's no checksum, 0xFA if there is)
    if (file[address + i] === 0x7F || file[address + i] === 0xFA) {
      name.push(' ');
      continue;
    }
    //Zero (0x00 if there's no checksum, 0xFC if there is)
    if (file[address + i] === 0 || file[address + i] === 0xFC) {
      name.push('0')
      continue;
    }
    name.push(charmap[file[address + i].toString(16).toUpperCase() as keyof typeof charmap]);
  }
  return name;
};

export function writeString(
  file: Uint8Array,
  address: number,
  length: number,
  name: string[],
  hasChecksum: boolean
): Uint8Array {
  for (let i = 0; i < name.length; i++) {
    //Space (0x7F if there's no checksum, 0xFA if there is)
    if (name[i] === ' ') {
      file[address + i] = hasChecksum ? 0xFA : 0x7F;
      continue;
    }
    //Zero (0x00 if there's no checksum, 0xFC if there is)
    if (name[i] === '0' && hasChecksum) {
      file[address + i] = 0xFC;
      continue;
    }
    file[address + i] = parseInt(Object.keys(charmap).find(
      (c) => charmap[c as keyof typeof charmap] === name[i]
    )!, 16);
  }
  //Once we finish the name, we should add the terminator,
  //unless it's already max length. In addition, the remaining
  //bytes should be filled with dummy values.
  if (length === name.length) return file;
  file[address + name.length] = hasChecksum ? 0xFB : 0x53;
  for (let i = name.length + 1; i < length; i++) {
    file[address + i] = hasChecksum ? 0xFB : 0x53;
  }
  return file;
};
