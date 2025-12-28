//This is the file responsible for taking the edited save file and re-calculating & applying all the NewBox checksums.
//Details of the checksum system can be found at:
//https://github.com/Rangi42/polishedcrystal/blob/master/docs/newbox_format.md
function checksumBoxMon(file: Uint8Array, address: number): Uint8Array {
  //Start with 127
  let x = 127;
  //For bytes 0-31, add the value times (byte + 1)
  for (let byte = 0; byte <= 31; byte++) {
    x += file[address + byte] * (byte + 1);
  }
  //For bytes 32-48, add the value of the lower 7 bits times (byte + 2)
  for (let byte = 32; byte <= 48; byte++) {
    x += (file[address + byte] & 0x7F) * (byte + 2);
  }
  //Clamp to two bytes
  x = x & 0xffff;
  //Treat the two bytes as a series of bits
  //Write the most significant bit to byte 32's MSB
  //Continue with the 2nd most significant bit to byte 33's MSB
  //So on and so forth
  for (let byte = 32; byte <= 47; byte++) {
    // Clear MSB and set it to the corresponding bit from checksum
    file[address + byte] = (file[address + byte] & 0x7F) | (((x >> (47 - byte)) & 1) << 7);
  }
  //Clear the MSB of byte 48
  file[address + 48] &= 0x7F
  return file;
}

export default checksumBoxMon;
