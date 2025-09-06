//A collection of small helper functions

const TYPE_COLOURS = {
  bug: "#92BC2C",
  dark: "#595761",
  dragon: "#0C69C8",
  electric: "#F2D94E",
  fire: "#FBA54C",
  fairy: "#EE90E6",
  fighting: "#D3425F",
  flying: "#A1BBEC",
  ghost: "#5F6DBC",
  grass: "#5FBD58",
  ground: "#DA7C4D",
  ice: "#75D0C1",
  normal: "#A0A29F",
  poison: "#B763CF",
  psychic: "#FA8581",
  rock: "#C9BB8A",
  steel: "#5695A3",
  water: "#539DDF",
};

export const getTypeColour = (type) => {
  return TYPE_COLOURS[type];
};

const NATURES = [
  "Hardy",
  "Lonely",
  "Brave",
  "Adamant",
  "Naughty",
  "Bold",
  "Docile",
  "Relaxed",
  "Impish",
  "Lax",
  "Timid",
  "Hasty",
  "Serious",
  "Jolly",
  "Naive",
  "Modest",
  "Mild",
  "Quiet",
  "Bashful",
  "Rash",
  "Calm",
  "Gentle",
  "Sassy",
  "Careful",
  "Quirky",
];

export const getNature = (x) => {
  return NATURES[x];
};

export const cammyFormat = (str) => {
  if (str === "spiky_eared") {
    return "spiky";
  }
  return str
    .toLowerCase()
    .replaceAll(" ", "_")
    .replaceAll("-", "_")
    .replaceAll("'", "_")
    .replaceAll(".", "_")
    .replaceAll("♂", "m")
    .replaceAll("♀", "f")
    .replaceAll("é", "e");
};

//Converts save file to string of two-digit hex numbers
export const buf2hex = (buffer) => {
  return [...new Uint8Array(buffer)].map((x) =>
    x.toString(16).padStart(2, "0").toUpperCase()
  );
};

//The opposite of the above
export const hex2buf = (hex) => {
  const bytes = new Uint8Array(hex.map((byte) => parseInt(byte, 16)));
  return bytes.buffer
};

//Converts hex byte string to string of 8 bits
export const hex2bin = (hex) => {
  return parseInt(hex, 16).toString(2).padStart(8, "0");
};
