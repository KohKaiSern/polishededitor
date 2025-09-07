<script setup>
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import DVEVNature from "./boxEditors/DVEVNature.vue";

const mon = defineModel();
</script>

<template>
  <Accordion class="m-0">
    <AccordionPanel value="stats">
      <AccordionHeader>DVs, EVs & Natures</AccordionHeader>
      <AccordionContent>
        <DVEVNature v-model="mon" />
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
