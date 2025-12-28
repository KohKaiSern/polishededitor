import { writeJSON } from "./utils";
import addresses from "./addresses";
import apricorns from "./apricorns";
import boxThemes from "./boxThemes";
import charmap from './charmap';
import expCandy from "./expCandy";
import items from "./items";
import keyItems from "./keyItems";
import keyboard from "./keyboard";
import locations from "./locations";
import moves from './moves';
import natures from "./natures";
import pokemon from "./pokemon";
import tmhms from "./tmhms";
import versions from "./versions";
import wings from "./wings";

for (const [name, obj] of Object.entries({
  addresses,
  apricorns,
  boxThemes,
  charmap,
  expCandy,
  items,
  keyItems,
  keyboard,
  locations,
  moves,
  natures,
  pokemon,
  tmhms,
  versions,
  wings
})) {
  writeJSON(name, obj);
}
