<script setup>
import { inject, ref, onBeforeMount } from "vue";
import Select from "primevue/select";

const mon = defineModel();
const moves = ref(null);
const PF = inject("PF");

const getMove = (moveName) => {
  //If no move
  if (moveName === "---") {
    return {
      Type: "-",
      "Base Power": "-",
      Accuracy: "-",
      "Power Points": "-",
      "Effect Chance": "-",
      "Damage Category": "-",
    };
  }
  return moves.value[PF].find((move) => moveName === move["Name"]);
};

onBeforeMount(async () => {
  moves.value = await (
    await fetch("https://polishededitor-backend.vercel.app/moves")
  ).json();
});
</script>

<template>
  <div v-if="moves" class="flex flex-col gap-3">
    <div v-for="(move, index) in mon['Moves']">
      <Select
        class="w-full"
        v-model="mon['Moves'][index]"
        :options="[...moves[PF].map((move) => move['Name']), '---']"
        filter
      />
      <div class="grid grid-cols-2 gap-1 mt-3">
        <div>
          Type:
          {{
            getMove(move)["Type"].at(0).toUpperCase() +
            getMove(move)["Type"].slice(1)
          }}
        </div>
        <div>Base Power: {{ getMove(move)["Base Power"] }}</div>
        <div>
          Category:
          {{
            getMove(move)["Damage Category"].at(0).toUpperCase() +
            getMove(move)["Damage Category"].slice(1)
          }}
        </div>
        <div>Accuracy: {{ getMove(move)["Accuracy"] }}%</div>
        <div>Power Points: {{ getMove(move)["Power Points"] }}</div>
        <div>Effect Chance: {{ getMove(move)["Effect Chance"] }}%</div>
      </div>
    </div>
  </div>
</template>
