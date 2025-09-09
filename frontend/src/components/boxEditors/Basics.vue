<script setup>
import { inject, ref, onBeforeMount } from "vue";
import Select from "primevue/select";

const mon = defineModel();
const PF = inject("PF");
const pokemon = inject("pokemon");
const abilities = inject("abilities");
const items = inject("items");

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
  <div>
    <span class="text-lg font-semibold">Held Item</span> <br />
    <Select
      class="mt-3 mb-3"
      v-model="mon['Held Item']"
      :options="[...items[PF].map((item) => item['Name']), 'None']"
      filter
    />
    <p>
      {{
        items[PF].find((item) => item["Name"] === mon["Held Item"])?.[
          "Description"
        ] || "This Pokémon has no held item."
      }}
    </p>
    <br />
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
