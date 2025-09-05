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
  join(__dirname, '../public/polishedcrystal/data/abilities/names.asm')
const descriptionsASM =
  join(__dirname, "../public/polishedcrystal/data/abilities/descriptions.asm")

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

const extractDescriptions = (data, PF) => {
  for (let i = 0; i < data.length; i++) {
    let abilitiesArr = [];
    let description = "";
    //Once we hit a line that has signals a description
    while (data[i].endsWith("Description:")) {
      //We add in every ability that the description applies to
      abilitiesArr.push(reduce(data[i].replace("Description:", "")));
      i++;
    }
    //Now we actually grab the description
    while (abilitiesArr.length > 0 && data[i] != "done") {
      description += data[i].slice(0, -1).split('"').at(-1);
      if (description.at(-1) === "-") {
        description = description.slice(0, -1);
        i++;
        continue;
      }
      description += " ";
      i++;
    }
    //Now we add it to abilities
    for (let entry of abilitiesArr) {
      let ability = abilities[PF].find((ability) => ability["ID"] === entry);
      if (ability) {
        ability["Description"] = description;
      }
    }
  }
};

//#1: Names
let raw = await readFile(namesASM, "utf-8");
const namesFILES = splitFile(raw);
extractNames(namesFILES[0], "Polished");
extractNames(namesFILES[1], "Faithful");

//#2: Descriptions
raw = await readFile(descriptionsASM, "utf-8");
const descriptionsFILES = splitFile(raw);
extractDescriptions(descriptionsFILES[0], "Polished");
extractDescriptions(descriptionsFILES[1], "Faithful");

//Getter abilities
const getAbilities = () => {
  return abilities;
};

export default getAbilities;
