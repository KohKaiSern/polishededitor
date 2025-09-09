<script setup>
import { inject } from "vue";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import IftaLabel from "primevue/iftalabel";

const mon = defineModel();
const PF = inject("PF");
const pokemon = inject("pokemon");
const abilities = inject("abilities");
const items = inject("items");
const growthRates = inject("growthRates");

const getAbilities = () => {
  let species = pokemon.value[PF].find(
    (species) => species["Name"] === mon.value["Species"]
  );
  let form = species["Forms"].find(
    (form) => form["Name"] === mon.value["Form"]
  );
  return form["Abilities"];
};

const getGrowthRate = () => {
  let species = pokemon.value[PF].find(
    (species) => species["Name"] === mon.value["Species"]
  );
  let form = species["Forms"].find(
    (form) => form["Name"] === mon.value["Form"]
  );
  return form["Growth Rate"]
}

const getExpForLevel = (level) => {
  // Formula: [1]/[2]*n**3 + [3]*n**2 + [4]*n - [5]
  const growthCoefficients = growthRates.value[getGrowthRate()];
}
</script>

<template>
  <div>
    <span class="text-lg font-semibold">Held Item</span> <br />
    <Select
      class="mt-3 mb-3"
      v-model="mon['Held Item']"
      :options="[...items[PF].map((item) => item['Name']), 'None']"
      filter
      fluid
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
      fluid
    />
    <p>
      {{
        abilities[PF].find((ability) => ability["Name"] === mon["Ability"])[
          "Description"
        ]
      }}
    </p>
    <br>
    <span class="text-lg font-semibold">Level / Experience</span>
    <IftaLabel class="mt-3 mb-3">
      <InputNumber id="level" v-model="mon['Level']" :min="0" :max="100" fluid/>
      <label for="level">Level</label>
    </IftaLabel>
    <p>{{ getExpForLevel() }}</p>
  </div>
</template>
