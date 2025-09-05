//This is the file responsible for parsing the save file into usable Mon Objects

//GET Pokemon Object
let response = await fetch("https://polishededitor-backend.vercel.app/pokemon");
const pokemon = await response.json();
//GET sRAM Addresses
response = await fetch("https://polishededitor-backend.vercel.app/addresses");
const addresses = await response.json();

//Converts save file to string of two-digit hex numbers
const buf2hex = (buffer) => {
  return [...new Uint8Array(buffer)].map((x) =>
    x.toString(16).padStart(2, "0").toUpperCase()
  );
};

//Parses one Pokemon's worth of data into a Pokemon Object
const parseMon = (save, address, PF) => {
  //Byte #1: Species

  //HANDLE BYTE #22 FIRST: Gender, isEgg, 9th-Bit, Form

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

//Determines the memory address of each Pokemon and calls the parse function on it.
//Details of the NewBox system can be found at:
//https://github.com/Rangi42/polishedcrystal/blob/master/docs/newbox_format.md
export const parseSave = async (save, PF) => {
  //Converts Buffer to Array of Hex Strings
  save = buf2hex(save);

  //Retrieve all indexes from sBackupNewBoxXEntries
  let indexes = Array(20)
    .fill()
    .map(() => Array(20).fill(0));
  for (let box = 0; box < 20; box++) {
    for (let i = 0; i < 20; i++) {
      indexes[box][i] =
        parseInt(
          save[parseInt(addresses["sBackupNewBox1"], 16) + (33 * box + i)],
          16
        ) - 1;
    }
  }

  //Retrieve all flags from sBackupNewBoxXBanks
  let flags = Array(20)
    .fill()
    .map(() => Array(20).fill(0));
  for (let box = 0; box < 20; box++) {
    //Grab the three relevant bytes
    let flagArr = [
      save[parseInt(addresses["sBackupNewBox1"], 16) + 33 * box + 20],
      save[parseInt(addresses["sBackupNewBox1"], 16) + 33 * box + 21],
      save[parseInt(addresses["sBackupNewBox1"], 16) + 33 * box + 22],
    ];
    //Convert into binary
    flagArr = flagArr.map((byte) => {
      byte = parseInt(byte, 16)
        .toString(2)
        .padStart(8, "0")
        .split("")
        .reverse()
        .join("");
      return byte;
    });
    flagArr = flagArr[0] + flagArr[1] + flagArr[2];
    //Get flag bit
    for (let i = 0; i < 20; i++) {
      flags[box][i] = flagArr[i];
    }
  }

  //Filling 20 Boxes of 20 Pokemon...
  let data = Array(20)
    .fill()
    .map(() => Array(20).fill(0));
  for (let box = 0; box < 20; box++) {
    for (let i = 0; i < 20; i++) {
      //Check if Pokemon exists
      if (indexes[box][i] === -1) {
        continue;
      }

      //If it does, find the memory block
      let block = "";
      //Check flag
      if (flags[box][i] === "0") {
        block += "1";
      } else {
        block += "2";
      }
      //Check letter
      if (indexes[box][i] < 168) {
        block += "A";
      } else if (indexes[box][i] < 197) {
        block += "B";
      } else {
        block += "C";
      }
      //Get address
      let address = parseInt(addresses[`sBoxMons${block}`], 16);
      if (block[1] === "A") {
        address += indexes[box][i] * 49;
      } else if (block[1] === "B") {
        address += (indexes[box][i] - 167) * 49;
      } else {
        address += (indexes[box][i] - 196) * 49;
      }
      data[box][i] = parseMon(save, address, PF);
    }
  }
  return data;
};

export default parseSave;
