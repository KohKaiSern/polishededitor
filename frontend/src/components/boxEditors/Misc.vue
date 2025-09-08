<script setup>
import { inject } from "vue";
import Select from "primevue/select";

const mon = defineModel();
const { form } = defineProps(["form"]);
const PF = inject("PF");

</script>

<template>
  <div>
    <span class="text-lg font-semibold">Gender</span> <br />
    <Select
      class="mt-3 mb-3"
      v-model="mon['Gender']"
      :options="form['Has Gender'] ? ['Male', 'Female'] : ['Genderless']"
      :disabled="!form['Has Gender']"
    />
  </div>
</template>
