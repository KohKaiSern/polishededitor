import { hex2bin, bin2hex, getNature } from "./helpers.js";

//GET Pokemon Object
let response = await fetch("https://polishededitor-backend.vercel.app/pokemon");
const pokemon = await response.json();

//GET Items Object
response = await fetch("https://polishededitor-backend.vercel.app/items");
const items = await response.json();

//GET Moves Object
response = await fetch("https://polishededitor-backend.vercel.app/moves");
const moves = await response.json();

//GET Abilities Object
response = await fetch("https://polishededitor-backend.vercel.app/abilities");
const abilities = await response.json();

//Parses one Pokemon object and edits the save file as necessary.
const reverseParseMon = (save, address, mon, PF) => {
  //Byte #1, Byte #22: Species, 9th-Bit, Form
  const dexNo =
    pokemon[PF].findIndex((pokemon) => pokemon["Name"] === mon["Species"]) + 1;

  //9th-Bit Activated
  const byte22 = hex2bin(save[address + 21]);
  if (dexNo > 254) {
    save[address] = (dexNo - 254).toString(16);
    save[address + 21] = bin2hex(byte22.slice(0, 2) + "1" + byte22.slice(3));
  } else {
    save[address] = dexNo.toString(16);
    save[address + 21] = bin2hex(byte22.slice(0, 2) + "0" + byte22.slice(3));
  }

  //Form
  const formNo = pokemon[PF][dexNo - 1]["Forms"]
    .find((form) => form["Name"] === mon["Form"])
    ["Form Number"].toString(2)
    .padStart(5, "0");
  save[address + 21] = bin2hex(byte22.slice(0, 3) + formNo);

  //TODO: Figure out why Mr. Mime (Kantonian) has a Form Number of 0.

  //Byte #2: Held Item

  //Byte #3-6: Moveset

  //Byte #7-8: ID [UNSUPPORTED]

  //Byte #9-11: EXP

  //Byte #12-17: EVs

  //Byte #18-20: DVs

  //Byte #21: Ability, Nature, Shininess

  //Byte #22: Gender, isEgg

  //Byte #23: PP Ups TODO

  //Byte #24: Happiness

  //Byte #25: Pokerus [UNSUPPORTED]

  //Byte #26: Caught Ball, Caught Time, Caught Data [UNSUPPORTED]

  //Byte #27: Caught Level [UNSUPPORTED]

  //Byte #28: Caught Location [UNSUPPORTED]

  //Byte #29: Level

  //Byte #30: Hyper Training TODO

  //Byte #31-#32: Extra [UNSUPPORTED]

  //Byte #33-42: Nickname TODO

  //Byte #43-49: Original Trainer [UNSUPPORTED]
  return save;
};

export default reverseParseMon;
