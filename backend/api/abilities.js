import { readFile } from "fs/promises";
import splitFile from "../lib/split.js";
import reduce from "../lib/reduce.js";

let abilities = {
  Polished: [],
  Faithful: [],
};

const getAbilities = () => {
  return abilities;
};

export default getAbilities;
