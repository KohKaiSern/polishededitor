<script setup>
import Card from "primevue/card";
import Button from "primevue/button";
import { getTypeColour, cammyFormat } from "../lib/helpers.js";

const pokemon = defineModel();

const getGIFURL = () => {
  // Format names to Cammy's format
  let species = pokemon.value["Is Egg"]
    ? "egg"
    : cammyFormat(pokemon.value["Species"]);
  let form = pokemon.value["Is Egg"]
    ? "plain"
    : cammyFormat(pokemon.value["Form"]);
  const shine = pokemon.value["Shininess"] === "Shiny" ? "shiny" : "normal";

  //Put it all together
  const formPath = form === "plain" ? species : `${species}_${form}`;
  return `https://raw.githubusercontent.com/caomicc/polisheddex/refs/heads/main/public/sprites/pokemon/${formPath}/${shine}_front_animated.gif`;
};
</script>

<template>
  <Card>
    <template #title>
      <div class="flex justify-between gap-x-1 gap-y-3">
        <div class="flex items-stretch">
          <div
            class="mr-5 size-[70px] bg-white rounded-lg flex justify-center items-center"
          >
            <img :src="getGIFURL()" />
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
        <div>
          <Button icon="pi pi-pen-to-square" size="small" severity="secondary" />
        </div>
      </div>
    </template>
    <template #content>
      <div class="mt-1">
        Held Item: {{ pokemon["Held Item"] }}<br />
        Ability: {{ pokemon["Ability"] }}<br />
        Nature: {{ pokemon["Nature"] }}<br />
      </div>
    </template>
  </Card>
</template>
