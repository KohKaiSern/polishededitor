//This is the file responsible for parsing the mon objects into a new save file.
import reverseParseMon from "./reverseparsemon.js";
import getAddresses from "./addresses.js";

//Determines the memory address of each Pokemon and calls the reverse parse function on it.

export const reverseParseSave = (save, data, PF) => {
  //Get 20x20 Array of Addresses
  const addresses = getAddresses(save);
  //Loop through every address and edit the save
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      if (data[i][j] === null) {
        continue
      }
      save = reverseParseMon(save, addresses[i][j], data[i][j], PF)
    }
  }
  return save;
};

export default reverseParseSave;
