import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import splitFile from "../lib/split.js";
import reduce from "../lib/reduce.js";

let moves = {
  Polished: [],
  Faithful: [],
};

//Paths
const namesASM = join(
  __dirname,
  "../public/polishedcrystal/data/moves/names.asm"
);
const movesASM = join(
  __dirname,
  "../public/polishedcrystal/data/moves/moves.asm"
);

const extractNames = (data, PF) => {
  data = data.filter((line) => line.startsWith("li "));
  data = data.map((line) => line.slice(4, -1));
  for (let move of data.slice(1)) {
    moves[PF].push({
      ID: reduce(move),
      Name: move,
      "Move Number": data.indexOf(move),
    });
  }
};

const extractMoves = (data, PF) => {
  data = data.filter((line) => line.startsWith("move "));
  data = data.map((line) => line.slice(5).split(","));
  data = data.map((move) => move.map((info) => reduce(info.trim())));
  for (let entry of data) {
    let move = moves[PF].find((move) => move["ID"] === entry[0]);
    //TODO Special Case: Psychic
    if (entry[0] === "psychicm") {
      move = moves[PF].find((move) => move["ID"] === "psychic");
    }
    if (move) {
      move["Base Power"] = parseInt(entry[2]);
      move["Type"] = entry[3];
      move["Accuracy"] = parseInt(entry[4]);
      move["Power Points"] = parseInt(entry[5]);
      move["Effect Chance"] = entry[6] === "0" ? "-" : parseInt(entry[6]);
      move["Damage Category"] = entry[7];
    }
  }
};

//#1: Names
let raw = await readFile(namesASM, "utf-8");
const namesFILES = splitFile(raw);
extractNames(namesFILES[0], "Polished");
extractNames(namesFILES[1], "Faithful");

//#2: Base Power, Type, Accuracy, Power Points, Effect Chance, Damage Category
raw = await readFile(movesASM, "utf-8");
const movesFILES = splitFile(raw);
extractMoves(movesFILES[0], "Polished");
extractMoves(movesFILES[1], "Faithful");

//Moves GETTER
const getMoves = () => {
  return moves;
};

export default getMoves;
