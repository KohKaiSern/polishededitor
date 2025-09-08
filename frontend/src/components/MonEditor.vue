<script setup>
import { computed, onBeforeMount, ref, inject } from "vue";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import DVEVNature from "./boxEditors/DVEVNature.vue";
import Moveset from "./boxEditors/Moveset.vue";
import Basics from "./boxEditors/Basics.vue";

const mon = defineModel();
const pokemon = ref(null);
const PF = inject("PF");
onBeforeMount(async () => {
  pokemon.value = await (
    await fetch("https://polishededitor-backend.vercel.app/pokemon")
  ).json();
});

//Gets the form's data
const form = computed(() => {
  let species = pokemon.value[PF].find(
    (species) => species["Name"] === mon.value["Species"]
  );
  let form = species["Forms"].find(
    (form) => form["Name"] === mon.value["Form"]
  );
  return form;
});
</script>

<template>
  <Accordion class="m-0">
    <AccordionPanel value="basic" v-if="pokemon">
      <AccordionHeader>Basics</AccordionHeader>
      <AccordionContent>
        <Basics v-model="mon" :form/>
      </AccordionContent>
    </AccordionPanel>
    <AccordionPanel value="stats">
      <AccordionHeader>DVs, EVs & Natures</AccordionHeader>
      <AccordionContent>
        <DVEVNature v-model="mon" />
      </AccordionContent>
    </AccordionPanel>
    <AccordionPanel value="moves">
      <AccordionHeader>Moveset</AccordionHeader>
      <AccordionContent>
        <Moveset v-model="mon" />
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
