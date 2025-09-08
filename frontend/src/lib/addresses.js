//This function takes a save file and returns a 20x20 Array of Memory Address, one for each pokemon.
//If the slot is empty, it leaves a 0.

//GET Addresses
let response = await fetch(
  "https://polishededitor-backend.vercel.app/addresses"
);
const addresses = await response.json();

//Details of the NewBox system can be found at:
//https://github.com/Rangi42/polishedcrystal/blob/master/docs/newbox_format.md

export const getAddresses = (save) => {
  //Retrieve all indexes from sBackupNewBoxXEntries
  // prettier-ignore
  let indexes = Array(20).fill().map(() => Array(20).fill(null));
  for (let box = 0; box < 20; box++) {
    for (let i = 0; i < 20; i++) {
      // prettier-ignore
      indexes[box][i] =
        parseInt(save[parseInt(addresses["sBackupNewBox1"], 16) + (33 * box + i)], 16) - 1;
    }
  }

  //Retrieve all flags from sBackupNewBoxXBanks
  // prettier-ignore
  let flags = Array(20).fill().map(() => Array(20).fill(null));
  for (let box = 0; box < 20; box++) {
    //Grab the three relevant bytes
    let flagArr = [
      save[parseInt(addresses["sBackupNewBox1"], 16) + 33 * box + 20],
      save[parseInt(addresses["sBackupNewBox1"], 16) + 33 * box + 21],
      save[parseInt(addresses["sBackupNewBox1"], 16) + 33 * box + 22],
    ];
    //Convert into binary
    flagArr = flagArr
      .map((byte) => {
        byte = parseInt(byte, 16)
          .toString(2)
          .padStart(8, "0")
          .split("")
          .reverse()
          .join("");
        return byte;
      })
      .join("");

    //Get flag bit
    for (let i = 0; i < 20; i++) {
      flags[box][i] = flagArr[i];
    }
  }

  //Filling 20 Boxes of 20 Pokemon...
  // prettier-ignore
  let data = Array(20).fill().map(() => Array(20).fill(null));
  for (let box = 0; box < 20; box++) {
    for (let i = 0; i < 20; i++) {
      //Check if Pokemon exists
      if (indexes[box][i] === -1) {
        continue;
      }

      //If it does, find the memory block
      const block =
        (flags[box][i] === "0" ? "1" : "2") +
        (indexes[box][i] < 167 ? "A" : indexes[box][i] < 195 ? "B" : "C");

      //Get address
      let address = parseInt(addresses[`sBoxMons${block}`], 16);
      if (block[1] === "A") {
        address += indexes[box][i] * 49;
      } else if (block[1] === "B") {
        address += (indexes[box][i] - 167) * 49;
      } else {
        address += (indexes[box][i] - 195) * 49;
      }
      data[box][i] = address;
    }
  }
  return data;
};

export default getAddresses;
