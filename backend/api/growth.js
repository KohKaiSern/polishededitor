import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import reduce from "../lib/reduce.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let growthRates = {};

//Paths
const growthASM = join(
  __dirname,
  "../public/polishedcrystal/data/growth_rates.asm"
);

const extractGrowthRates = (data) => {
  data = data.split("\n");
  data = data.map((line) => line.trim());
  data = data.filter((line) => line.includes("growth_rate "));
  for (let growthRate of data) {
    growthRates[reduce(growthRate.split(";").at(1).trim())] = growthRate
      .split(";")
      .at(0)
      .slice(12, -1)
      .split(",")
      .map((x) => parseInt(x.trim()));
  }
};

//#1: Growth Rates
let raw = await readFile(growthASM, "utf-8");
extractGrowthRates(raw);

//Growth Rates GETTER
const getGrowthRates = () => {
  return growthRates;
};

export default getGrowthRates;
