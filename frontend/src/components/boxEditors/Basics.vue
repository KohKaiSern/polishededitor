<script setup>
import { inject, ref, onBeforeMount } from "vue";
import Select from "primevue/select";

const mon = defineModel();
const abilities = ref(null);
const PF = inject("PF");
const pokemon = inject("pokemon");

onBeforeMount(async () => {
  abilities.value = await (
    await fetch("https://polishededitor-backend.vercel.app/abilities")
  ).json();
});

const getAbilities = () => {
  let species = pokemon.value[PF].find(
    (species) => species["Name"] === mon.value["Species"]
  );
  let form = species["Forms"].find(
    (form) => form["Name"] === mon.value["Form"]
  );
  return form["Abilities"];
};
</script>

<template>
  <div v-if="abilities">
    <span class="text-lg font-semibold">Ability</span> <br />
    <Select
      class="mt-3 mb-3"
      v-model="mon['Ability']"
      :options="getAbilities()"
    />
    <p>
      {{
        abilities[PF].find((ability) => ability["Name"] === mon["Ability"])[
          "Description"
        ]
      }}
    </p>
  </div>
</template>
