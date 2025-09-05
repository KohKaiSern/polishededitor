//GET Pokemon Object
let response = await fetch("https://polishededitor-backend.vercel.app/pokemon");
const pokemon = await response.json();

//Parses one Pokemon's worth of data into a Pokemon Object
const parseMon = (save, address, PF) => {
  let mon = {}
  //Byte #1, Byte #22: Species, Gender, isEgg, 9th-Bit, Form
  let dexNo = parseInt(save[address], 16)
  //Check 9th-Bit
  const byte22 = parseInt(save[address + 21], 16).toString(2)
  if (byte22.at(2) === '1') {
    dexNo += 254
  }
  let formNo = parseInt(byte22.slice(3), 2)
  let species = pokemon[PF][dexNo - 1]
  const form = species["Forms"].find((form) => form["Form Number"] === formNo)

  mon["Name"] = species["Name"]
  mon["Form"] = form["Name"]

  //Byte #2: Held Item

  //Byte #3-6: Moveset

  //Byte #7-8: ID [UNSUPPORTED]

  //Byte #9-11: EXP

  //Byte #12-17: EVs

  //Byte #18-20: DVs

  //Byte #21: Ability, Nature, Shininess

  //Byte #22: HANDLED AFTER BYTE #1

  //Byte #23: PP Ups

  //Byte #24: Happiness

  //Byte #25: Pokerus [UNSUPPORTED]

  //Byte #26: Caught Ball, Caught Time, Caught Data [UNSUPPORTED]

  //Byte #27: Caught Level [UNSUPPORTED]

  //Byte #28: Caught Location [UNSUPPORTED]

  //Byte #29: Level

  //Byte #30-32: Extra [UNSUPPORTED]

  //Byte #33-42: Nickname

  //Byte #43-49: Original Trainer [UNSUPPORTED]
  return mon;
};

export default parseMon;