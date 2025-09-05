<script setup>
import { ref, watch } from "vue";
import FileUpload from "primevue/fileupload";
import Divider from "primevue/divider";
import ToggleSwitch from "primevue/toggleswitch";
import parseSave from "./lib/parsesave.js";
import Editor from "./components/Editor.vue";

const fileContent = ref(null);
const data = ref(null);
const PF = ref(true);

//Receive File Input
const handleFileSelect = (event) => {
  const file = event.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    fileContent.value = e.target.result;
  };
  reader.readAsArrayBuffer(file);
};

watch(fileContent, () => {
  //Compile File Data into Pokemon Objects
  data.value = parseSave(fileContent.value, PF.value ? "Polished" : "Faithful");
});
</script>

<template>
  <div class="m-5">
    <div class="flex justify-between">
      <h1 class="text-3xl mb-5">Polished Editor</h1>
      <div class="flex text-center gap-2">
        <ToggleSwitch class="mt-0.25" v-model="PF" :disabled="data != null" />
        <span v-if="PF">Polished</span>
        <span v-else>Faithful</span>
      </div>
    </div>
    <FileUpload
      mode="basic"
      accept=".sav,.srm"
      :maxFileSize="128000"
      @select="handleFileSelect"
    />
    <Divider />
    <Editor v-if="data != null" :data="data" :PF="PF" />
  </div>
</template>

<style scoped></style>
