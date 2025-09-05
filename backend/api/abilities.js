import { readFile } from "fs/promises";

let abilities = {
  Polished: [],
  Faithful: [],
};

const getAbilities = () => {
  return abilities;
};

export default getAbilities;
