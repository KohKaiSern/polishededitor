<script setup>
import Card from "primevue/card";
defineProps(["pokemon"]);
</script>

<template>
  <Card>
    <template #title>
      {{ pokemon["Species"] }}
    </template>
    <template #content>
      Held Item: {{ pokemon["Held Item"] }}<br />
      Ability: {{ pokemon["Ability"] }}<br />
      Nature: {{ pokemon["Nature"] }}<br />
      Moveset: {{ pokemon["Moves"].join(", ") }}<br />
      DVs: {{ pokemon["DVs"].join(", ") }}<br />
      EVs: {{ pokemon["EVs"].join(", ") }}<br />
      Happiness: {{ pokemon["Happiness"] }}<br />
      Level: {{ pokemon["Level"] }}<br />
      Form: {{ pokemon["Form"] }}<br />
    </template>
  </Card>
</template>
