<script setup>
import { inject, watch } from "vue";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";

const mon = defineModel();
const PF = inject("PF");
const pokemon = inject("pokemon");
const abilities = inject("abilities");
const items = inject("items");
const growthRates = inject("growthRates");

const getForms = () => {
  let species = pokemon.value[PF].find(
    (species) => species["Name"] === mon.value["Species"]
  );
  return species["Forms"].map((form) => form["Name"]);
};

const getAbilities = () => {
  let species = pokemon.value[PF].find(
    (species) => species["Name"] === mon.value["Species"]
  );
  let form = species["Forms"].find(
    (form) => form["Name"] === mon.value["Form"]
  );

  //If the specific form isn't found, fall back to the first form temporarily
  if (!form) {
    form = species["Forms"][0];
  }

  return form["Abilities"];
};

const getGrowthRate = () => {
  let species = pokemon.value[PF].find(
    (species) => species["Name"] === mon.value["Species"]
  );
  let form = species["Forms"].find(
    (form) => form["Name"] === mon.value["Form"]
  );
  return form["Growth Rate"].slice(6);
};

const getExpForLevel = (level) => {
  //Formula: [1]/[2]*n**3 + [3]*n**2 + [4]*n - [5]
  const growthCFs = growthRates.value[getGrowthRate()];
  return Math.ceil(
    (growthCFs[0] / growthCFs[1]) * level ** 3 +
      growthCFs[2] * level ** 2 +
      growthCFs[3] * level -
      growthCFs[4]
  );
};

//Watch for species changes, reset everything to default
watch(
  () => mon.value["Species"],
  (newSpecies) => {
    let species = pokemon.value[PF].find(
      (species) => species["Name"] === newSpecies
    );

    mon.value["Form"] = species["Forms"][0]["Name"];
    mon.value["Ability"] = species["Forms"][0]["Abilities"][0];
    mon.value["Experience"] = getExpForLevel(mon.value["Level"]);
    if (!species["Forms"][0]["Has Gender"]) {
      mon.value["Gender"] = "Genderless";
    }
  }
);

//Watch for form changes, reset everything to default
watch(
  () => mon.value["Form"],
  () => {
    let species = pokemon.value[PF].find(
      (species) => species["Name"] === mon.value["Species"]
    );
    let form = species["Forms"].find(
      (form) => form["Name"] === mon.value["Form"]
    );

    mon.value["Ability"] = form["Abilities"][0];
    mon.value["Experience"] = getExpForLevel(mon.value["Level"]);
    if (!species["Forms"][0]["Has Gender"]) {
      mon.value["Gender"] = "Genderless";
    }
  }
);

//Change experience when level changes
watch(
  () => mon.value["Level"],
  () => {
    mon.value["Experience"] = getExpForLevel(mon.value["Level"]);
  }
);
</script>

<template>
  <div>
    <span class="text-lg font-semibold">Species / Form</span> <br />
    <div>
      <Select
        class="mt-3 mb-3"
        v-model="mon['Species']"
        :options="pokemon[PF].map((pokemon) => pokemon['Name'])"
        filter
        fluid
      />
      <Select
        class="mt-3 mb-3"
        v-model="mon['Form']"
        :options="getForms()"
        filter
        fluid
      />
    </div>
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
    <br />
    <span class="text-lg font-semibold">Level</span>
    <InputNumber
      class="mt-3"
      id="level"
      v-model="mon['Level']"
      :min="0"
      :max="100"
      fluid
      showButtons
    />
  </div>
</template>
