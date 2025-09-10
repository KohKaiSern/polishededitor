<script setup>
import { inject } from "vue";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";

const mon = defineModel();
const PF = inject("PF");
const pokemon = inject("pokemon");

const formHasGender = () => {
  let species = pokemon.value[PF].find(
    (pokemon) => pokemon["Name"] === mon.value["Species"]
  );
  let form = species["Forms"].find(
    (form) => form["Name"] === mon.value["Form"]
  );

  //If the specific form isn't found, fall back to the first form temporarily
  if (!form) {
    form = species["Forms"][0];
  }

  return form["Has Gender"];
};
</script>

<template>
  <div>
    <span class="text-lg font-semibold">Gender</span> <br />
    <Select
      class="mt-3 mb-3"
      v-model="mon['Gender']"
      :options="formHasGender() ? ['Male', 'Female'] : ['Genderless']"
      :disabled="!formHasGender()"
      fluid
    />
    <span class="text-lg font-semibold">Shininess</span> <br />
    <Select
      class="mt-3 mb-3"
      v-model="mon['Shininess']"
      :options="['Shiny', 'Not Shiny']"
      fluid
    />
    <div v-if="!mon['Is Egg']">
      <span class="text-lg font-semibold">Happiness</span> <br />
      <InputNumber
        class="mt-3 mb-3"
        v-model="mon['Happiness']"
        :min="0"
        :max="255"
        showButtons
        fluid
      />
    </div>
    <div v-else>
      <span class="text-lg font-semibold">Hatch Cycles</span> <br />
      <InputNumber
        class="mt-3 mb-3"
        v-model="mon['Hatch Cycles']"
        :min="0"
        :max="255"
        showButtons
        fluid
      />
    </div>
  </div>
</template>
