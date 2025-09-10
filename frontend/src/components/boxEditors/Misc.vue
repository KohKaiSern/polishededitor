<script setup>
import { inject } from "vue";
import Select from "primevue/select";

const mon = defineModel();
const PF = inject("PF");
const pokemon = inject("pokemon");

const formHasGender = () => {
  let species = pokemon.value[PF].find(
    (pokemon) => pokemon["Name"] === mon.value["Species"]
  );
  let form = species["Forms"].find(
    (form) => (form["Name"] === mon.value["Form"])
  );
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
    <br />
    <span class="text-lg font-semibold">Shininess</span> <br />
    <Select
      class="mt-3 mb-3"
      v-model="mon['Shininess']"
      :options="['Shiny', 'Not Shiny']"
      fluid
    />
  </div>
</template>
