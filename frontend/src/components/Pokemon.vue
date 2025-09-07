<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import Drawer from "primevue/drawer";
import { getTypeColour, cammyFormat } from "../lib/helpers.js";
import MonEditor from "./MonEditor.vue";

const mon = defineModel();
const toggleEdit = ref(false);
const screenSize = ref([window.innerHeight, window.innerWidth]);

onMounted(() => {
  window.addEventListener("resize", updateScreenSize);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});
const updateScreenSize = () => {
  screenSize.value = [window.innerHeight, window.innerWidth];
};

const getGIFURL = () => {
  // Format names to Cammy's format
  let species = mon.value["Is Egg"] ? "egg" : cammyFormat(mon.value["Species"]);
  let form = mon.value["Is Egg"] ? "plain" : cammyFormat(mon.value["Form"]);
  const shine = mon.value["Shininess"] === "Shiny" ? "shiny" : "normal";

  //Put it all together
  const formPath = form === "plain" ? species : `${species}_${form}`;
  return `https://raw.githubusercontent.com/caomicc/polisheddex/refs/heads/main/public/sprites/pokemon/${formPath}/${shine}_front_animated.gif`;
};
</script>

<template>
  <div>
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
              <span>{{ mon["Species"] }}</span>
              <div class="flex gap-3">
                <div
                  v-for="type in mon['Type']"
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
            <Button
              icon="pi pi-pen-to-square"
              size="small"
              severity="secondary"
              @click="toggleEdit = true"
            />
          </div>
        </div>
      </template>
      <template #content>
        <div class="mt-1">
          Held Item: {{ mon["Held Item"] }}<br />
          Ability: {{ mon["Ability"] }}<br />
          Nature: {{ mon["Nature"] }}<br />
        </div>
      </template>
    </Card>
    <div>
      <Drawer
        :class="screenSize[0] > screenSize[1] ? '!h-[70%]' : '!w-[50%]'"
        v-model:visible="toggleEdit"
        :header="`Edit ${mon['Species']}`"
        :position="screenSize[0] > screenSize[1] ? 'bottom' : 'right'"
      >
        <MonEditor v-model="mon" />
      </Drawer>
    </div>
  </div>
</template>
