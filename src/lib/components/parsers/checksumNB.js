//This is the file responsible for taking the edited save file and re-calculating & applying all the NewBox checksums.
import getAddresses from "./getAddresses.js";
import { hex2bin } from "$components/helpers.js";

//Details of the checksum system can be found at:
//https://github.com/Rangi42/polishedcrystal/blob/master/docs/newbox_format.md

//This function calculates and applies the checksum on the save for one pokemon
const calcChecksum = (fileHex, address) => {
  //Start with 127
  let x = 127;
  //For bytes #1-#32, add the value times byteNo
  for (let byteNo = 1; byteNo <= 32; byteNo++) {
    x += parseInt(fileHex[address + byteNo - 1], 16) * byteNo;
  }
  //For bytes #33-#49, add the value of the lower 7 bits times byteNo + 1
  for (let byteNo = 33; byteNo <= 49; byteNo++) {
    x +=
      parseInt(hex2bin(fileHex[address + byteNo - 1]).slice(1), 2) * (byteNo + 1);
  }
  //Clamp to two bytes
  x = x & 0xffff;
  //Treat the two bytes as a series of bits
  x = x.toString(2).padStart(16, "0");
  //Write the most signficant bit to byte #33's MSB
  //Continue with the 2nd most signficant bit to byte #34's MSB
  //So on and so forth
  for (let byteNo = 33; byteNo <= 48; byteNo++) {
    let newByte = hex2bin(fileHex[address + byteNo - 1]);
    newByte = x.at(byteNo - 33) + newByte.slice(1);
    fileHex[address + byteNo - 1] = parseInt(newByte, 2).toString(16).padStart(2, "0");
  }
  return fileHex;
};

//This function finds all of the addresses to apply calcChecksum to.
export const checksumNB = (fileHex) => {
  //Get 20x20 Array of Addresses
  const addresses = getAddresses(fileHex);
  //Loop through every address and apply the checksum function.
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      if (addresses[i][j] === null) {
        continue
      }
      fileHex = calcChecksum(fileHex, addresses[i][j])
    }
  }
  return fileHex;
};

export default checksumNB;
