import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import splitFile from "../lib/split.js";
import reduce from "../lib/reduce.js";

let items = {
  Polished: [],
  Faithful: [],
};

//Paths
const namesASM = join(
  __dirname,
  "../public/polishedcrystal/data/items/names.asm"
);
const descriptionsASM = join(
  __dirname,
  "../public/polishedcrystal/data/items/descriptions.asm"
);
const attributesASM = join(
  __dirname,
  "../public/polishedcrystal/data/items/attributes.asm"
);

const extractNames = (data, PF) => {
  data = data.filter((line) => line.startsWith("li "));
  data = data.map((line) => line.slice(0, -1).split('"').at(-1));
  for (let item of data.slice(1)) {
    items[PF].push({
      ID: reduce(item),
      Name: item,
      "Item Number": data.indexOf(item),
    });
  }
};

const extractDescriptions = (data, PF) => {
  for (let i = 0; i < data.length; i++) {
    let itemsArr = [];
    let description = "";
    //Once we hit a line that has signals a description
    while (data[i].endsWith("Desc:")) {
      //We add in every item that the description applies to
      itemsArr.push(reduce(data[i].replace("Desc:", "")));
      i++;
    }
    //Now we actually grab the description
    while (itemsArr.length > 0 && data[i] != "done") {
      description += data[i].slice(0, -1).split('"').at(-1);
      if (description.at(-1) === "-") {
        description = description.slice(0, -1);
        i++;
        continue;
      }
      description += " ";
      i++;
    }
    //Now we add it to items
    for (let entry of itemsArr) {
      let item = items[PF].find((item) => item["ID"] === entry);
      if (item) {
        item["Description"] = description.trim();
      }
    }
  }
};

const coverInconsistencies = (PF) => {
  let altPF = PF === "Polished" ? "Faithful" : "Polished";
  for (let item of items[PF]) {
    if (!item.hasOwnProperty("Description")) {
      item["Description"] =
        items[altPF][item["Item Number"] - 1]["Description"];
    }
  }
};

const extractAttributes = (data, PF) => {
  data = data.filter((line) => line.startsWith("item_attribute "));
  data = data.map((line) => reduce(line.split(",").at(3)));
  for (let i = 0; i < data.length; i++) {
    items[PF][i]["Type"] = data[i];
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

coverInconsistencies("Polished");
coverInconsistencies("Faithful");

//#3: Attributes
raw = await readFile(attributesASM, "utf-8");
const attributesFILES = splitFile(raw);
extractAttributes(attributesFILES[0], "Polished");
extractAttributes(attributesFILES[1], "Faithful");

//Items GETTER
const getItems = () => {
  return items;
};

export default getItems;
