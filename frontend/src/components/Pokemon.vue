<script setup>
import Card from "primevue/card";
defineProps(["pokemon"]);

const typeColours = {
  bug: "#92BCDC",
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

const reduce = (str) => {
  //TODO Special Case: Spiky-Eared Pichu
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

const getGIFURL = (species, form, shininess) => {
  //Format names to Cammy's format
  species = reduce(species);
  form = reduce(form);

  //Decide the right URL path
  const shine = shininess === "Shiny" ? "shiny" : "normal";
  const formPath = form === "plain" ? species : `${species}_${form}`;
  return `https://raw.githubusercontent.com/caomicc/polisheddex/refs/heads/main/public/sprites/pokemon/${formPath}/${shine}_front_animated.gif`;
};
</script>

<template>
  <Card>
    <template #title>
      <div class="flex items-stretch">
        <div
          class="mr-5 size-[70px] bg-white rounded-lg flex justify-center items-center"
        >
          <img
            :src="
              getGIFURL(
                pokemon['Species'],
                pokemon['Form'],
                pokemon['Shininess']
              )
            "
          />
        </div>
        <div class="flex flex-col justify-between">
          <span>{{ pokemon["Species"] }}</span>
          <div class="flex gap-3">
            <div
              v-for="type in pokemon['Type']"
              class="size-[30px] rounded-lg flex items-center justify-center"
              :style="{ backgroundColor: typeColours[type] }"
            >
              <img
                class="size-[70%] object-contain"
                :src="`https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/5781623f147f1bf850f426cfe1874ba56a9b75ee/icons/${type}.svg`"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #content>
      Held Item: {{ pokemon["Held Item"] }}<br />
      Ability: {{ pokemon["Ability"] }}<br />
      Nature: {{ pokemon["Nature"] }}<br />
      Moveset: {{ pokemon["Moves"].join(", ") }}<br />
      DVs: {{ pokemon["DVs"].join(", ") }}<br />
      EVs: {{ pokemon["EVs"].join(", ") }}<br />
      Happiness: {{ pokemon["Happiness"] }}<br />
      Level: {{ pokemon["Level"] }}<br />
    </template>
  </Card>
</template>
