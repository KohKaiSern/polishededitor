import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import splitFile from "../lib/split.js";
import reduce from "../lib/reduce.js";

let pokemon = {
  Polished: [],
  Faithful: [],
};

//Paths
const namesASM = join(
  __dirname,
  "../public/polishedcrystal/data/pokemon/names.asm"
);
const formsASM = join(
  __dirname,
  "../public/polishedcrystal/constants/pokemon_constants.asm"
);
const monDIR = join(
  __dirname,
  "../public/polishedcrystal/data/pokemon/base_stats/"
);

const extractNames = (data, PF) => {
  let dexNo = 1;
  for (let lineNo = 0; lineNo < data.length; lineNo++) {
    //Skips undesirable lines
    if (
      !data[lineNo].startsWith("rawchar ") ||
      data[lineNo].includes("?000?") ||
      data[lineNo].includes("Egg") ||
      data[lineNo].includes("?256?")
    ) {
      continue;
    }
    //TODO SPECIAL CASE: DUDUNSPARCE
    if (data[lineNo].includes("Dudunsparc")) {
      pokemon[PF].push({
        ID: "dudunsparce",
        Name: "Dudunsparce",
        "Dex Number": dexNo,
        Forms: [],
      });
      dexNo++;
      continue;
    }
    pokemon[PF].push({
      ID: reduce(data[lineNo].slice(9, -1)),
      Name: data[lineNo].slice(9, -1),
      "Dex Number": dexNo,
      Forms: [],
    });
    dexNo++;
  }
};

const extractForms = (data, PF) => {
  //Has Form
  for (let lineNo = 0; lineNo < data.length; lineNo++) {
    //Non-Regional Forms
    if (data[lineNo].startsWith("ext_const_def")) {
      //Get the name of the Pokemon
      const name = data[lineNo - 1].slice(2);
      while (data[lineNo].startsWith("ext_const")) {
        //Skip undesirable lines
        if (!data[lineNo].includes(";")) {
          lineNo++;
          continue;
        }
        let form = data[lineNo].split(";");
        form[0] = form[0].slice(10);
        form[0] = form[0].slice(form[0].indexOf("_") + 1).trim();
        form[0] = form[0].slice(0, -5).toLowerCase();
        form[1] = parseInt(
          form[1].trim().slice(form[1].trim().indexOf("(") + 1, -1),
          16
        );
        let mon = pokemon[PF].find((mon) => mon["ID"] === reduce(name));
        mon["Forms"].push({
          ID: reduce(form[0]),
          Name: form[0],
          "Form Number": form[1],
          Type: [],
          Abilities: [],
          "Base Stats": [],
          "Growth Rate": [],
          "Has Gender": null,
        });
        lineNo++;
      }
    }

    //Regional Forms
    if (data[lineNo].includes("FORM EQU ")) {
      //IGNORE NO_FORM 0, PLAIN_FORM 1
      if (
        data[lineNo].includes("NO_FORM") ||
        data[lineNo].includes("PLAIN_FORM")
      ) {
        continue;
      }
      let formName = data[lineNo]
        .slice(4, data[lineNo].indexOf("_"))
        .toLowerCase();
      let formNo = parseInt(data[lineNo].slice(-1));
      //Run through all the Pokemon that have that Regional Form
      lineNo++;
      while (data[lineNo].startsWith("const_skip")) {
        let name = data[lineNo].slice(data[lineNo].indexOf(";") + 2);
        name = name.slice(name.indexOf(" ") + 1);

        //Add it in!
        let mon = pokemon[PF].find((mon) => mon["ID"] === reduce(name));
        mon["Forms"].push({
          ID: reduce(formName),
          Name: formName,
          "Form Number": formNo,
          Type: [],
          Abilities: [],
          "Base Stats": [],
          "Growth Rate": [],
          "Has Gender": null,
        });
        lineNo++;
      }
    }
  }

  //Plain Form
  let plain = {
    ID: "plain",
    Name: "plain",
    "Form Number": 1,
    Type: [],
    Abilities: [],
    "Base Stats": [],
    "Growth Rate": [],
    "Has Gender": null,
  };
  pokemon[PF].forEach((mon) => {
    //Case #1: Pokemon has no forms
    if (mon["Forms"].length === 0) {
      mon["Forms"].push({ ...plain });
    }
    //Case #2: Pokemon with alternate forms, none of which have default
    else if (mon["Forms"].every((form) => form["Form Number"] != 1)) {
      mon["Forms"].unshift({ ...plain });
    }
  });
};

const extractMon = (data, PF) => {
  //Parse all the data
  let name_form = data
    .find((line) => line.startsWith("abilities_for"))
    .split(",")
    .at(0)
    .split(" ")
    .at(-1);

  let types = data
    .find((line) => line.endsWith("type"))
    .slice(3, -7)
    .split(",");
  types = types.map((type) => reduce(type.trim()));
  if (types[0] === types[1]) {
    types = [types[0]];
  }

  let abilities = data
    .find((line) => line.startsWith("abilities_for"))
    .split(",")
    .slice(1);
  abilities = abilities.map((ability) => reduce(ability.trim()));

  let bsts = data
    .find((line) => line.endsWith("BST"))
    .slice(3, -9)
    .split(",");
  bsts = bsts.map((bst) => parseInt(bst.trim()));

  const growthRate = reduce(
    data
      .find((line) => line.includes("db GROWTH"))
      .slice(3)
      .split(";")
      .at(0)
      .trim()
  );

  const hasGender =
    data
      .find((line) => line.includes("GENDER"))
      .slice(3)
      .split(",")
      .at(0)
      .trim() === "GENDER_UNKNOWN"
      ? false
      : true;

  //Add it in!
  //Special Case: Armored Mewtwo (labelled as Mewtwo in file)
  //If Polished, Armored Mewtwo is a functional variant
  //If Faithful, Armored Mewtwo is a cosmetic variant
  //Plan of action - if name is Mewtwo and types are Psychic, Steel
  //We must be in the Polished version, so add a special handler
  if (
    reduce(name_form) === "mewtwo" &&
    JSON.stringify(types) === '["psychic","steel"]'
  ) {
    const mon = pokemon["Polished"].find((mon) => mon["ID"] === "mewtwo");
    let form = mon["Forms"].find((form) => form["ID"] === "armored");
    form["Type"] = types;
    form["Abilities"] = abilities;
    form["Base Stats"] = bsts;
    form["Growth Rate"] = growthRate;
    form["Has Gender"] = hasGender;
    return;
  }

  //Case #1: Adding to plain form
  let mon = pokemon[PF].find((mon) => mon["ID"] === reduce(name_form));
  if (mon) {
    const form = mon["Forms"].find((form) => form["Form Number"] === 1);
    form["Type"] = types;
    form["Abilities"] = abilities;
    form["Base Stats"] = bsts;
    form["Growth Rate"] = growthRate;
    form["Has Gender"] = hasGender;
    return;
  }

  //Case #2: Adding to functional form
  mon = pokemon[PF].find(
    (mon) => mon["ID"] === reduce(name_form.split("_").slice(0, -1).join("_"))
  );
  if (mon) {
    const form = mon["Forms"].find(
      (form) => form["ID"] === reduce(name_form.split("_").at(-1))
    );
    form["Type"] = types;
    form["Abilities"] = abilities;
    form["Base Stats"] = bsts;
    form["Growth Rate"] = growthRate;
    form["Has Gender"] = hasGender;
    return;
  }
};

const extractCosmetic = (PF) => {
  //Case #3: Adding to cosmetic form: Can only be done after all files are read.
  let mons = pokemon[PF].filter((mon) => {
    return mon["Forms"].some((form) => form["Has Gender"] === null);
  });
  for (let mon of mons) {
    //Distribute default form data to the rest of the forms
    //TODO: This is predicated on the assumption that a Pokemon cannot have both cosmetic and functional variants
    for (let form of mon["Forms"].slice(1)) {
      form["Type"] = mon["Forms"][0]["Type"];
      form["Abilities"] = mon["Forms"][0]["Abilities"];
      form["Base Stats"] = mon["Forms"][0]["Base Stats"];
      form["Growth Rate"] = mon["Forms"][0]["Growth Rate"];
      form["Has Gender"] = mon["Forms"][0]["Has Gender"];
    }
  }
};

//#1: Names, Dex Numbers
let raw = await readFile(namesASM, "utf-8");
const namesFILES = splitFile(raw);
extractNames(namesFILES[0], "Polished");
extractNames(namesFILES[1], "Faithful");

//#2: Forms
raw = await readFile(formsASM, "utf-8");
const formsFILES = splitFile(raw);
extractForms(formsFILES[0], "Polished");
extractForms(formsFILES[1], "Faithful");

//#3: Type, Abilities, Base Stats, Growth Rate, Gender
const filenames = await readdir(monDIR);
await Promise.all(
  filenames.map(async (filename) => {
    raw = await readFile(join(monDIR, filename), "utf-8");
    const monFILES = splitFile(raw);
    extractMon(monFILES[0], "Polished");
    extractMon(monFILES[1], "Faithful");
  })
);

//#3: Special Case: Cosmetic Forms
extractCosmetic("Polished");
extractCosmetic("Faithful");

//Pokemon GETTER
const getPokemon = () => {
  return pokemon;
};

export default getPokemon;
