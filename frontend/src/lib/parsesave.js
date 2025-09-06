//This is the file responsible for parsing the save file into usable Mon Objects
import parseMon from "./parsemon.js";
import getAddresses from "./addresses.js";

//Determines the memory address of each Pokemon and calls the parse function on it.
//Details of the NewBox system can be found at:
//https://github.com/Rangi42/polishedcrystal/blob/master/docs/newbox_format.md

export const parseSave = (save, PF) => {
  //Get 20x20 Array of Addresses
  const addresses = getAddresses(save);
  let data = Array(20).fill().map(() => Array(20).fill(null));
  //Loop through every address and return a Pokemon object.
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      if (addresses[i][j] === null) {
        continue
      }
      data[i][j] = parseMon(save, addresses[i][j], PF)
    }
  }
  return data;
};

export default parseSave;
