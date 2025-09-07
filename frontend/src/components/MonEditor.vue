<script setup>
import { watch } from "vue";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import IftaLabel from "primevue/iftalabel";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";

const pokemon = defineModel();

//TODO CALCULATE EXP
watch(pokemon["Level"], () => {
  return
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <IftaLabel>
      <InputText id="nickname" />
      <label for="nickname">Nickname</label>
    </IftaLabel>
    <IftaLabel>
      <InputNumber id="level" v-model="pokemon['Level']" showButtons :min="1" :max="100" fluid/>
      <label for="level">Level</label>
    </IftaLabel>
  </div>
  <Accordion class="m-0">
    <AccordionPanel value="stats">
      <AccordionHeader>DVs, EVs & Natures</AccordionHeader>
      <AccordionContent>
        <div
          class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          <IftaLabel>
            <InputNumber
              id="hp"
              v-model="pokemon['DVs'][0]"
              showButtons
              :min="0"
              :max="15"
              fluid
            ></InputNumber>
            <label for="hp">HP</label>
          </IftaLabel>
          <IftaLabel>
            <InputNumber
              id="atk"
              v-model="pokemon['DVs'][1]"
              showButtons
              :min="0"
              :max="15"
              fluid
            ></InputNumber>
            <label for="atk">Atk</label>
          </IftaLabel>
          <IftaLabel>
            <InputNumber
              id="def"
              v-model="pokemon['DVs'][2]"
              showButtons
              :min="0"
              :max="15"
              fluid
            ></InputNumber>
            <label for="def">Def</label>
          </IftaLabel>
          <IftaLabel>
            <InputNumber
              id="spe"
              v-model="pokemon['DVs'][3]"
              showButtons
              :min="0"
              :max="15"
              fluid
            ></InputNumber>
            <label for="spe">Speed</label>
          </IftaLabel>
          <IftaLabel>
            <InputNumber
              id="spa"
              v-model="pokemon['DVs'][4]"
              showButtons
              :min="0"
              :max="15"
              fluid
            ></InputNumber>
            <label for="spa">Sp. Atk</label>
          </IftaLabel>
          <IftaLabel>
            <InputNumber
              id="spd"
              v-model="pokemon['DVs'][5]"
              showButtons
              :min="0"
              :max="15"
              fluid
            ></InputNumber>
            <label for="spd">Sp. Def</label>
          </IftaLabel>
        </div>
      </AccordionContent>
    </AccordionPanel>
    <AccordionPanel value="1">
      <AccordionHeader>Header II</AccordionHeader>
      <AccordionContent>
        <p class="m-0">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit,
          sed quia non numquam eius modi.
        </p>
      </AccordionContent>
    </AccordionPanel>
    <AccordionPanel value="2">
      <AccordionHeader>Header III</AccordionHeader>
      <AccordionContent>
        <p class="m-0">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus.
        </p>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
