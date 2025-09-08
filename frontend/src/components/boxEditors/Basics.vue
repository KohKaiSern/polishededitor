<script setup>
import { inject, ref, onBeforeMount } from "vue";
import Select from "primevue/select";

const mon = defineModel();
const { form } = defineProps(["form"]);
const abilities = ref(null);
const PF = inject("PF");

onBeforeMount(async () => {
  abilities.value = await (
    await fetch("https://polishededitor-backend.vercel.app/abilities")
  ).json();
});
</script>

<template>
  <div v-if="abilities">
    <span class="text-lg font-semibold">Ability</span> <br />
    <Select
      class="mt-3 mb-3"
      v-model="mon['Ability']"
      :options="form['Abilities']"
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
