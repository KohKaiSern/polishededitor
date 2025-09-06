import { readFile, readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let versions = {};

//Paths
const versionDIR = join(__dirname, "../public/");
const saveASM = join(
  __dirname,
  "../public/polishedcrystal/constants/misc_constants.asm"
);

const extractGameVersion = (dir) => {
  for (let filename of dir) {
    if (filename.endsWith(".sym")) {
      versions["Game"] = filename.slice(16, -4);
    }
  }
};

const extractSaveVersion = (data) => {
  data = data.split("\n");
  data = data.map((line) => line.trim());
  let saveVersion = data.find((line) => line.includes("SAVE_VERSION"));
  versions["Save"] = parseInt(saveVersion.split(" ").at(-1));
};

//#1: Game Version
let raw = await readdir(versionDIR, "utf-8");
extractGameVersion(raw);

//#2 Save Version
raw = await readFile(saveASM, "utf-8");
extractSaveVersion(raw);

//Abilities GETTER
const getVersions = () => {
  return versions;
};

export default getVersions;
