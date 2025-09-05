import { readFile } from "fs/promises";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import splitFile from "../lib/split.js";
import reduce from "../lib/reduce.js";

let abilities = {
  Polished: [],
  Faithful: [],
};

//Paths
const namesASM =
  join(import.meta.dirname, '..', 'public', 'polishedcrystal', 'data', 'abilities', 'names.asm')

const extractNames = (data, PF) => {
  data = data.filter((line) => line.includes("rawchar"));
  data = data.map((line) => line.slice(0, -1).split('"').at(-1));
  for (let ability of data.slice(1)) {
    abilities[PF].push({
      ID: reduce(ability),
      Name: ability,
    });
  }
};

//#1: Names
let raw = await readFile(namesASM, "utf-8");
const namesFILES = splitFile(raw);
extractNames(namesFILES[0], "Polished");
extractNames(namesFILES[1], "Faithful");

const getAbilities = () => {
  return abilities;
};

export default getAbilities;
