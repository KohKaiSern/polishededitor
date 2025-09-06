import { hex2bin, bin2hex, getNatureNo } from "./helpers.js";

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
    save[address] = (dexNo - 254).toString(16).padStart(2, "0");
    save[address + 21] = bin2hex(byte22.slice(0, 2) + "1" + byte22.slice(3));
  } else {
    save[address] = dexNo.toString(16).padStart(2, "0");
    save[address + 21] = bin2hex(byte22.slice(0, 2) + "0" + byte22.slice(3));
  }

  //Form
	const form = pokemon[PF][dexNo - 1]["Forms"].find((form) => form["Name"] === mon["Form"])
  const formNo = form["Form Number"].toString(2)
    .padStart(5, "0");
  save[address + 21] = bin2hex(byte22.slice(0, 3) + formNo);

  //Byte #2: Held Item
  const item = items[PF].find((item) => item["Name"] === mon["Held Item"]);
  if (item) {
    save[address + 1] = item["Item Number"].toString(16).padStart(2, "0");
  } else {
    save[address + 1] = "00";
  }

  //Byte #3-6: Moveset

  for (let i = 0; i < 4; i++) {
    if (mon["Moves"][i] === "---") {
      save[address + 2 + i] = "00";
    } else {
      const move = moves[PF].find((move) => move["Name"] === mon["Moves"][i]);
      save[address + 2 + i] = (move["Move Number"] + 1).toString(16).padStart(2, "0");
    }
  }

  //Byte #7-8: ID [UNSUPPORTED]

  //Byte #9-11: EXP

	const exp = mon["Experience"].toString(16).padStart(6, "0")
	save[address + 8] = exp.slice(0, 2)
	save[address + 9] = exp.slice(2, 4)
	save[address + 10] = exp.slice(4)

  //Byte #12-17: EVs

	for (let i = 0; i < 6; i++) {
		save[address + 11 + i] = (mon["EVs"].map((ev) => ev.toString(16).padStart(2, "0"))).at(i)
	}

  //Byte #18-20: DVs

	const dvs = mon["DVs"].map((dv) => dv.toString(16))
	save[address + 17] = dvs[0] + dvs[1]
	save[address + 18] = dvs[2] + dvs[3]
	save[address + 19] = dvs[4] + dvs[5]

  //Byte #21: Ability, Nature, Shininess

	const byte21 = hex2bin(save[address + 20])
	const abilityNo = form["Abilities"].findIndex((ability) => ability === mon["Ability"])
	save[address + 20] = bin2hex(byte21.at(0) + (abilityNo + 1).toString(2).padStart(2, "0") + byte21.slice(3))

	save[address + 20] = bin2hex((mon["Shininess"] === "Shiny" ? "1" : "0") + byte21.slice(1))

	save[address + 20] = bin2hex(byte21.slice(0, 3) + getNatureNo(mon["Nature"]).toString(2).padStart(5, "0"))

  //Byte #22: Gender, isEgg

	if (!(mon["Gender"] === "Genderless")) {
		if (mon["Gender"] === "Male") {
			save[address + 21] = bin2hex("0" + byte22.slice(1))
		} else {
			save[address + 21] = bin2hex("1" + byte22.slice(1))
		}
	}

	if (mon["Is Egg"]) {
		save[address + 21] = bin2hex(byte22.at(0) + "1" + byte22.slice(2))
	} else {
		save[address + 21] = bin2hex(byte22.at(0) + "0" + byte22.slice(2))
	}

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
