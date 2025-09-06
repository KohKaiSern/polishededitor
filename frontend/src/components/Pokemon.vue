<script setup>
import Card from "primevue/card";
import { getTypeColour, cammyFormat } from "../lib/helpers.js";

const pokemon = defineModel();

const getGIFURL = (species, form, shininess, isEgg) => {
  //Format names to Cammy's format
  species = cammyFormat(species);
  form = cammyFormat(form);

  //Special Case: Egg
  if (isEgg) {
    form = "plain";
    species = "egg";
  }

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
                pokemon['Shininess'],
                pokemon['Is Egg']
              )
            "
          />
        </div>
        <div class="flex flex-col justify-between">
          <span>{{ pokemon["Species"] }}</span>
          <div class="flex gap-3">
            <div
              v-for="type in pokemon['Type']"
              class="size-[30px] rounded-[50%] flex items-center justify-center"
              :style="{ backgroundColor: getTypeColour(type) }"
            >
              <img
                class="size-[60%] object-contain"
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
