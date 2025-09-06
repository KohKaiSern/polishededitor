import { hex2bin } from "./helpers.js";

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

//Calculates checksum
const calcChecksum = (save, address) => {
  //Start with 127
  let x = 127;
  //For bytes #1-#32, add the value times byteNo
  for (let byteNo = 1; byteNo < 33; byteNo++) {
    x += parseInt(save[address + byteNo - 1], 16) * byteNo
  }
  //For bytes #33-#49, add the value of the lower 7 bits times byteNo + 1
  for (let byteNo = 33; byteNo < 50; byteNo++) {
    x += parseInt(hex2bin(save[address + byteNo - 1]).slice(1), 2) * (byteNo + 1)
  }
  //Clamp to two bytes
  x = (x < 0 || x > 65535) ? 0 : x
  //Treat the two bytes as a series of bits
  x = x.toString(2).padStart(16, "0")
  //Write the most signficant bit to byte #33's MSB
  //Continue with the 2nd most signficant bit to byte #34's MSB
  //So on and so forth
  for (let byteNo = 33; byteNo < 49; byteNo++) {
    let newByte = hex2bin(save[address + byteNo - 1])
    newByte = x.at(byteNo - 33) + newByte.slice(1)
    save[address + byteNo - 1] = newByte
  }
  return save
}

//Parses one Pokemon's worth of data into a Pokemon Object
const parseMon = (save, address, PF) => {
  let mon = {};

  //Byte #1, Byte #22: Species, 9th-Bit, Form
  let dexNo = parseInt(save[address], 16);

  //Check 9th-Bit
  const byte22 = hex2bin(save[address + 21])
  if (byte22.at(2) === "1") {
    dexNo += 254;
  }

  let formNo = parseInt(byte22.slice(3), 2);
  let species = pokemon[PF][dexNo - 1];
  //TODO: Figure out why Mr. Mime (Kantonian) has a Form Number of 0.
  if (formNo === 0) {
    formNo = 1;
  }

  const form = species["Forms"].find((form) => form["Form Number"] === formNo);

  mon["Species"] = species["Name"];
  mon["Form"] = form["Name"];
  mon["Type"] = form["Type"];

  //Byte #2: Held Item

  if (save[address + 1] === "00") {
    mon["Held Item"] = "None";
  } else {
    mon["Held Item"] = items[PF][parseInt(save[address + 1], 16) - 1]["Name"];
  }

  //Byte #3-6: Moveset

  let moveset = [];
  for (let i = 2; i < 6; i++) {
    if (save[address + i] === "00") {
      moveset.push("---");
      continue;
    }
    moveset.push(moves[PF][parseInt(save[address + i], 16) - 2]["Name"]);
  }

  mon["Moves"] = moveset;

  //Byte #7-8: ID [UNSUPPORTED]

  //Byte #9-11: EXP

  mon["Experience"] = parseInt(
    save[address + 8] + save[address + 9] + save[address + 10],
    16
  );

  //Byte #12-17: EVs

  mon["EVs"] = [
    parseInt(save[address + 11], 16),
    parseInt(save[address + 12], 16),
    parseInt(save[address + 13], 16),
    parseInt(save[address + 14], 16),
    parseInt(save[address + 15], 16),
    parseInt(save[address + 16], 16),
  ];

  //Byte #18-20: DVs

  mon["DVs"] = [
    parseInt(save[address + 17].at(0), 16),
    parseInt(save[address + 17].at(1), 16),
    parseInt(save[address + 18].at(0), 16),
    parseInt(save[address + 18].at(1), 16),
    parseInt(save[address + 19].at(0), 16),
    parseInt(save[address + 19].at(1), 16),
  ];

  //Byte #21: Ability, Nature, Shininess

  const byte21 = hex2bin(save[address + 20])

  mon["Shininess"] = byte21.at(0) === "1" ? "Shiny" : "Not Shiny";

  const NATURES = [
    "Hardy",
    "Lonely",
    "Brave",
    "Adamant",
    "Naughty",
    "Bold",
    "Docile",
    "Relaxed",
    "Impish",
    "Lax",
    "Timid",
    "Hasty",
    "Serious",
    "Jolly",
    "Naive",
    "Modest",
    "Mild",
    "Quiet",
    "Bashful",
    "Rash",
    "Calm",
    "Gentle",
    "Sassy",
    "Careful",
    "Quirky",
  ];

  mon["Nature"] = NATURES[parseInt(byte21.slice(3), 2)];

  const ability = abilities[PF].find(
    (ability) =>
      form["Abilities"].at(parseInt(byte21.slice(1, 3), 2) - 1) ===
      ability["ID"]
  );
  mon["Ability"] = ability["Name"];

  //Byte #22: Gender, isEgg

  mon["Is Egg"] = byte22.at(1) === "0" ? false : true;

  if (form["Has Gender"]) {
    mon["Gender"] = byte22.at(0) === "0" ? "Male" : "Female";
  } else {
    mon["Gender"] = "Genderless";
  }

  //Byte #23: PP Ups TODO

  //Byte #24: Happiness

  if (mon["Is Egg"]) {
    mon["Hatch Cycles"] = parseInt(save[address + 23], 16);
    mon["Happiness"] = "---";
  } else {
    mon["Hatch Cycles"] = "---";
    mon["Happiness"] = parseInt(save[address + 23], 16);
  }

  //Byte #25: Pokerus [UNSUPPORTED]

  //Byte #26: Caught Ball, Caught Time, Caught Data [UNSUPPORTED]

  //Byte #27: Caught Level [UNSUPPORTED]

  //Byte #28: Caught Location [UNSUPPORTED]

  //Byte #29: Level

  mon["Level"] = parseInt(save[address + 28], 16);

  //Byte #30: Hyper Training TODO

  //Byte #31-#32: Extra [UNSUPPORTED]

  //Byte #33-42: Nickname TODO

  //Byte #43-49: Original Trainer [UNSUPPORTED]
  return mon;
};

export default parseMon;
