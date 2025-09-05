import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let addresses = {};

//Path
const addressesASM = join(__dirname, "../public/polishedcrystal-3.1.1.sym");

//Symbols
const SYMBOLS = [
  "sBackupNewBox1Entries",
  "sBoxMons1A",
  "sBoxMons1B",
  "sBoxMons1C",
  "sBoxMons2A",
  "sBoxMons2B",
  "sBoxMons2C",
];

//Converts wRAM address to sRAM
const wToSRAM = (address) => {
  //M = (0x2000 * PP) + (QQQQ - 0xA000), where the original memory address was PP:QQQQ
  return (
    8192 * parseInt(address.slice(0, 2), 16) +
    (parseInt(address.slice(2), 16) - 40960)
  )
    .toString(16)
    .padStart(4, "0");
};

const extractAddresses = (data) => {
  data = data.split("\n").trim();
  data = data.map((line) => line.trim());
  for (let entry of SYMBOLS) {
    symbol = data.find((line) => line.endsWith(entry));
    addresses[entry] = wToSRAM(symbol.split(" ").at(0).replace(":", ""));
  }
};

//#1: Addresses
const raw = await readFile(addressesASM, "utf-8");
extractAddresses(raw);

//Abilities GETTER
const getAddresses = () => {
  return addresses;
};

export default getAddresses;
