<script setup>
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import Card from "primevue/card";
import IftaLabel from "primevue/iftalabel";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";

const mon = defineModel();
</script>

<template>
  <Accordion class="m-0">
    <AccordionPanel value="stats">
      <AccordionHeader>DVs, EVs & Natures</AccordionHeader>
      <AccordionContent>
        <Card>
          <template #title>Determinant Values</template>
          <template #content>
            <div
              class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-3"
            >
              <IftaLabel>
                <InputNumber
                  id="hp"
                  v-model="mon['DVs'][0]"
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
                  v-model="mon['DVs'][1]"
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
                  v-model="mon['DVs'][2]"
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
                  v-model="mon['DVs'][3]"
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
                  v-model="mon['DVs'][4]"
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
                  v-model="mon['DVs'][5]"
                  showButtons
                  :min="0"
                  :max="15"
                  fluid
                ></InputNumber>
                <label for="spd">Sp. Def</label>
              </IftaLabel>
            </div>
          </template>
        </Card>
        <Card>
          <template #title>Effort Values</template>
          <template #content>
            <div
              class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-3"
            >
              <IftaLabel>
                <InputNumber
                  id="hp"
                  v-model="mon['EVs'][0]"
                  showButtons
                  :min="0"
                  :max="252"
                  fluid
                ></InputNumber>
                <label for="hp">HP</label>
              </IftaLabel>
              <IftaLabel>
                <InputNumber
                  id="atk"
                  v-model="mon['EVs'][1]"
                  showButtons
                  :min="0"
                  :max="252"
                  fluid
                ></InputNumber>
                <label for="atk">Atk</label>
              </IftaLabel>
              <IftaLabel>
                <InputNumber
                  id="def"
                  v-model="mon['EVs'][2]"
                  showButtons
                  :min="0"
                  :max="252"
                  fluid
                ></InputNumber>
                <label for="def">Def</label>
              </IftaLabel>
              <IftaLabel>
                <InputNumber
                  id="spe"
                  v-model="mon['EVs'][3]"
                  showButtons
                  :min="0"
                  :max="252"
                  fluid
                ></InputNumber>
                <label for="spe">Speed</label>
              </IftaLabel>
              <IftaLabel>
                <InputNumber
                  id="spa"
                  v-model="mon['EVs'][4]"
                  showButtons
                  :min="0"
                  :max="252"
                  fluid
                ></InputNumber>
                <label for="spa">Sp. Atk</label>
              </IftaLabel>
              <IftaLabel>
                <InputNumber
                  id="spd"
                  v-model="mon['EVs'][5]"
                  showButtons
                  :min="0"
                  :max="252"
                  fluid
                ></InputNumber>
                <label for="spd">Sp. Def</label>
              </IftaLabel>
            </div>
          </template>
        </Card>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
