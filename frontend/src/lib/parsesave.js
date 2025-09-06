//This is the file responsible for parsing the save file into usable Mon Objects
import parseMon from "./parsemon.js";
import getAddresses from "./addresses.js";

//Determines the memory address of each Pokemon and calls the parse function on it.
//Details of the NewBox system can be found at:
//https://github.com/Rangi42/polishedcrystal/blob/master/docs/newbox_format.md

export const parseSave = (save, PF) => {
  //Get 20x20 Array of Addresses
  const addresses = getAddresses(save)
  //Loop through every address and return a Pokemon object.
  return addresses.map(box => box.map(mon => parseMon(save, mon, PF)))
};

export default parseSave;
