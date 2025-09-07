<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import Card from "primevue/card";
import Pokemon from "./Pokemon.vue";

const PF = defineProps();
const save = defineModel();
const boxNo = ref(1);
</script>

<template>
  <div>
    <div class="sticky top-0 mr-auto bg-[#121212] pt-3 pb-3 z-10">
      <Button
        icon="pi pi-caret-left"
        severity="secondary"
        @click="boxNo = boxNo === 1 ? 20 : boxNo - 1"
      />
      <span class="ml-3 mr-3 text-lg"> Box {{ boxNo }} </span>
      <Button
        icon="pi pi-caret-right"
        severity="secondary"
        @click="boxNo = boxNo === 20 ? 1 : boxNo + 1"
      />
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 items-stretch"
    >
      <div v-for="(mon, index) in save[boxNo - 1]" class="flex">
        <Card
          v-if="mon === null"
          :pt="{ caption: 'm-auto mb-2' }"
          class="flex flex-col flex-1"
        >
          <template #title>Empty</template>
          <template #content></template>
        </Card>
        <Pokemon
          v-else
          v-model="save[boxNo - 1][index]"
          class="flex flex-col flex-1"
        />
      </div>
    </div>
  </div>
</template>
